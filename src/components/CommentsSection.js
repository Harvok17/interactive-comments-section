import { LitElement, html, css } from "lit";
import "./CommentItem.js";

export class CommentsSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      max-width: 720px;
      margin: 50px auto;
    }
  `;

  render() {
    return html`<comment-item></comment-item>`;
  }
}
