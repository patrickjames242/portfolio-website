/* eslint-disable no-extend-native */

/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Number {
    ifNotFiniteThen<V>(v: V): number | V;
    ifNanThen<V>(v: V): number | V;
    /**
     * @description Returns a string with the number formatted to money ($30.39)
     *
     * @param alwaysShowDecimal if true, this function will always show the decimal even if the number is an integer. defaults to false
     */
    toMoneyString(alwaysShowDecimal?: boolean): string;
    clamp(
      options: { min: number } | { max: number } | { min: number; max: number },
    ): number;
  }
}

Number.prototype.ifNanThen = function (v: any) {
  if (isNaN(this as any)) {
    return v;
  } else return this;
};

Number.prototype.ifNotFiniteThen = function (v: any) {
  if (isFinite(this as any)) {
    return this;
  } else return v;
};

Number.prototype.toMoneyString = function (alwaysShowDecimal = false) {
  return (
    '$' +
    this.toLocaleString(
      undefined,
      Number(this) % 1 !== 0 || alwaysShowDecimal
        ? {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        : undefined,
    )
  );
};

Number.prototype.clamp = function (options) {
  let val = Number(this);
  if ('min' in options && 'max' in options && options.min > options.max) {
    throw new Error('the min value cannot be greater than the max value');
  }

  if ('min' in options) {
    val = Math.max(val, options.min);
  }
  if ('max' in options) {
    val = Math.min(val, options.max);
  }

  return val;
};
