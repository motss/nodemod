export interface PollingMeasureJson {
  duration: number;
  entryType: 'polling-measure';
  name: string;
  startTime: number;
}

export class PollingMeasure implements PollingMeasureJson {
  public readonly entryType = 'polling-measure';

  constructor(
    public readonly name: string,
    public readonly duration: number,
    public readonly startTime: number
  ) {}

  public toJSON(): PollingMeasureJson {
    return {
      duration: this.duration,
      entryType: this.entryType,
      name: this.name,
      startTime: this.startTime,
    };
  }

}