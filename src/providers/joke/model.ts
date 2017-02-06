import _ from "lodash";
import moment from 'moment';

export class Joke {
  id: string;
  content: string;
  rate: number;
  date: Date;
  author: string;

  constructor(json: Object) {
    this.id = _.get(json, "id", "");
    this.content = _.get(json, "content", "");
    this.rate = _.get(json, "rate", 0);
    this.date = this.parseDate(_.get(json, "date", ""));
    this.author = _.get(json, "author", null);
  }

  public toString(): string {
    return this.id;
  }

  private parseDate(date: string): Date {
    let momentDate = moment(date, 'D.M.Y');
    if (momentDate.isValid()) {
        return momentDate.toDate();
    }
    
    return null;
  }

  get contentHTML(): string {
    return this.content.replace(/\n/g, '<br />');
  }

  get authorName(): string {
    return this.author || 'nieznany';
  }
}