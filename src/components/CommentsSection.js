import { LitElement, html, css } from "lit";
import { connect } from "pwa-helpers";
import { store } from "../redux/store.js";
import "./CommentItem.js";
import "./ReplySection";

export class CommentsSection extends connect(store)(LitElement) {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      max-width: 720px;
      margin: 50px auto;
    }
  `;

  static properties = {
    comments: { state: true },
  };

  stateChanged(state) {
    this.comments = state.comments;
  }

  render() {
    return html`
      ${this.comments.map(
        (comment) =>
          html`<comment-item .commentData=${comment}></comment-item>
            ${comment.replies.length > 0
              ? html`<reply-section
                  .parentCommentId=${comment.id}
                  .replies=${comment.replies}
                ></reply-section>`
              : null} `
      )}
    `;
  }
}
