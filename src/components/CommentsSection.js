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

    .reply {
      min-height: 120px;
      display: flex;
      border-radius: 10px;
      background-color: var(--very-light-gray);
      padding: 20px;
    }

    .reply {
      margin-top: 10px;
      align-items: flex-start;
    }

    .reply textarea {
      flex: 1;
      margin-inline: 20px;
      height: 80px;
      border-radius: 10px;
      resize: none;
      padding: 20px;
      font-family: inherit;
    }

    .reply img {
      height: 40px;
      width: 40px;
    }
  `;

  static properties = {
    comments: { state: true },
  };

  stateChanged(state) {
    this.comments = state.comments;
    this.currentUser = state.currentUser;
  }

  render() {
    return html`
      ${this.comments.map(
        (comment) =>
          html`<comment-item
              .currentUser=${this.currentUser}
              .commentData=${comment}
            ></comment-item>
            ${comment.replies.length > 0
              ? html`<reply-section
                  .currentUser=${this.currentUser}
                  .parentCommentId=${comment.id}
                  .replies=${comment.replies}
                ></reply-section>`
              : null} `
      )}

      <div class="reply">
        <img
          src="${this.currentUser.image.png}"
          alt="${this.currentUser.username} image"
        />
        <textarea></textarea>
        <button>Reply</button>
      </div>
    `;
  }
}
