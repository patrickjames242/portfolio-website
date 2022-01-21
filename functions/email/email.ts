import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mailgun from "mailgun-js";
import serverless from "serverless-http";

const mg = mailgun({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/.netlify/functions/email", (request, response) => {
	const params = (() => {
		const parsedJson = request.body;
		if (typeof parsedJson !== "object" || parsedJson == null) return null;
		const { fullName, email, description } = parsedJson;
		if (
			[fullName, email, description].some(
				(x) => typeof x !== "string" || x.length < 1
			)
		)
			return null;
		return { fullName, email, description };
	})();

	if (params == null) {
		response
			.json({
				errorMessage:
					"non-empty values for fullName, email, and description must be provided in the json body of this request.",
			})
			.status(400);
		return;
	}

	const data = {
		from: "Patrick's Website <me@samples.mailgun.org>",
		to: "contact@patrickhanna.dev",
		subject: `Website Message: ${params.fullName}`,
		html: `
				<html>
					You just got a new message from your patrickhanna.dev website contact form!!!<br>
					<br>
					It's from: <b>${params.fullName}</b><br>
					Here's their email address: <a href="mailto:${params.email}">${params.email}</a><br>
					<br>
					Here's their message:<br>
					<br>
					<pre>"${params.description}"</pre>
				</html>
			`,
	};

	mg.messages().send(data, function (error, body) {
		if (error) {
			response.json({ errorMessage: body.message }).status(500);
		} else {
			response.end();
		}
	});
});

export const handler = serverless(app);
