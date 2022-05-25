import { LitElement, html, css } from "lit";
import "./CommentItem.js";
import JsonData from "../../data.json" assert { type: "json" };

export class CommentsSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      max-width: 720px;
      margin: 50px auto;
    }
  `;

  static properties = {
    store: { state: true },
  };

  constructor() {
    super();
    this.store = JsonData;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(this.store);
  }

  _updateStore(index) {
    return (e) => {
      this.store = {
        ...this.store,
        comments: this.store.comments.map((comment, idx) =>
          index === idx ? e.target.commentData : comment
        ),
      };

      console.log(this.store);
    };
  }

  render() {
    return html`
      ${this.store.comments.map(
        (comment, index) =>
          html`<comment-item
            .commentData=${comment}
            @comment-update=${this._updateStore(index)}
          ></comment-item>`
      )}
    `;
  }
}
