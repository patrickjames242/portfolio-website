import { Handler } from "@netlify/functions";
import mailgun from "mailgun-js";

const mg = mailgun({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN,
});

export const handler: Handler = (event, context) => {
	return new Promise((resolve, reject) => {
		if (event.httpMethod.toLowerCase() !== "post") {
			resolve({
				statusCode: 405,
			});
			return;
		}

		const params = (() => {
			try {
				const parsedJson = JSON.parse(event.body);
				if (typeof parsedJson !== "object" || parsedJson == null) return null;
				const { fullName, email, description } = parsedJson;
				if (
					[fullName, email, description].some(
						(x) => typeof x !== "string" || x.length < 1
					)
				)
					return null;
				return { fullName, email, description };
			} catch {
				return null;
			}
		})();

		if (params == null) {
			resolve({
				statusCode: 400,
				body: JSON.stringify({
					errorMessage:
						"non-empty values for fullName, email, and description must be provided in the json body of this request.",
				}),
			});
			return;
		}

		const data = {
			from: "Patrick's Website <me@samples.mailgun.org>",
			to: "contact@patrickhanna.dev",
			subject: `Website Message: ${params.fullName}`,
			html: `
				<html>
					You just got a new email from your patrickhanna.dev website!!!<br>
					<br>
					It's from: <b>${params.fullName}</b><br>
					Here's their email: <a href="mailto:${params.email}">${params.email}</a><br>
					<br>
					Here's their message:<br>
					<br>
					<pre>"${params.description}"</pre>
				</html>
			`,
		};
		mg.messages().send(data, function (error, body) {
			if (error) {
				resolve({
					statusCode: 500,
					body: JSON.stringify(error),
				});
			} else {
				resolve({
					statusCode: 200,
					body: JSON.stringify(body),
				});
			}
		});
	});
};
