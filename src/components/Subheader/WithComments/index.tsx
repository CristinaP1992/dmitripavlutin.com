import Tag from 'components/Tag';
import { formatDate } from 'utils/date';
import * as styles from './index.module.scss';
import { TO_POST } from 'routes/path';
import { ReactNode } from 'react';

interface SubheaderWithCommentsProps {
  post: PostPlain;
  children?: ReactNode;
}

const MONTH = 31 * 24 * 60 * 60 * 1000;

export default function SubheaderWithComments({ post, children }: SubheaderWithCommentsProps) {
  const postUrl = TO_POST({ slug: post.slug });
  const publishedDate = new Date(post.published);
  const modifiedDate = new Date(post.modified);
  let postDateType = 'Posted';
  let postDateFormatted = formatDate(post.published);
  if (modifiedDate.getTime() - publishedDate.getTime() >= MONTH) {
    postDateType = 'Updated';
    postDateFormatted = formatDate(post.modified);
  }
  return (
    <div className={styles.subheader}>
      <div className={styles.published}>{postDateType} {postDateFormatted}</div>
      <div className={styles.line}>
        <div className={styles.tags}>{post.tags.map(mapTag)}</div>
        <div className={styles.commentsCount}>
          <a href={`${postUrl}#comments`} title="Jump to comments section" className={styles.anchor}>
            {children ?? 'Start discussion'}
          </a>
        </div>
      </div>
    </div>
  );
}

function mapTag(tagName: string) {
  return <Tag tag={tagName} key={tagName} />;
}
