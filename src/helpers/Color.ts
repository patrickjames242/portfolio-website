export default class Color {
  readonly opacity: number;
  constructor(
    readonly red: number,
    readonly green: number,
    readonly blue: number,
    opacity?: number,
  ) {
    this.opacity = opacity ?? 0;
  }
}
