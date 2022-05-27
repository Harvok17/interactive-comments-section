import { LitElement, html, css } from "lit";

export class ReplySection extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-left: 40px;
      border-left: 3px solid #cbcbcb;
      padding-left: 40px;
    }
  `;

  static properties = {
    replies: { type: Array },
    parentCommentId: {},
  };
  render() {
    return html`${this.replies.map(
      (reply) =>
        html`<comment-item
          .parentCommentId=${this.parentCommentId}
          .replyContext="${true}"
          .commentData=${reply}
        ></comment-item>`
    )}`;
  }
}

customElements.define("reply-section", ReplySection);
