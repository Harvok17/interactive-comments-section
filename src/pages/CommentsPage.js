import { LitElement, html, css } from "lit";
import { connect } from "pwa-helpers";
import { store } from "../redux/store.js";
import "../components/CommentItem.js";
import "../components/ReplySection";
import { addComment } from "../redux/actions.js";

export class CommentsPage extends connect(store)(LitElement) {
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

  get textArea() {
    return this.renderRoot?.querySelector("textarea") ?? null;
  }

  _submitComment() {
    if (!this.textArea.value.trim()) return;

    const commentData = {
      id: this.comments.length + 1,
      content: this.textArea.value,
      createdAt: "Now",
      score: 0,
      user: this.currentUser,
      replies: [],
    };

    store.dispatch(addComment(commentData));
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
        <button @click=${this._submitComment}>Send</button>
      </div>
    `;
  }
}
