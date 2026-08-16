import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Icon from '@site/src/components/Icon';
import MoreLink from '@site/src/components/MoreLink';
import type {IconName} from '@site/src/theme/icons';
import styles from './styles.module.css';

type ModuleItem = {
  name: string;
  tagline: string;
} & (
  | {comingSoon?: false; logo: string; repoUrl: string; docsUrl?: string}
  | {comingSoon: true; icon: IconName}
);

const modules: ModuleItem[] = [
  {
    name: 'kiit-codes',
    logo: '/img/modules/kiit-codes-logo.png',
    tagline:
      'A small, dependency-free status and error taxonomy for outcomes, ' +
      'with extensible codes and optional Result<T, E> integration.',
    repoUrl: 'https://github.com/kiitdev/kiit-codes',
    docsUrl: '/docs/kiit-codes',
  },
  {
    name: 'kiit-result',
    logo: '/img/modules/kiit-result-logo.png',
    tagline:
      "A Kotlin Result<T, E> type for representing the outcome of an operation as " +
      "a success or failure, built on kiit-codes' status taxonomy.",
    repoUrl: 'https://github.com/kiitdev/kiit-result',
    // TODO: kiit-result's own docs page doesn't exist yet — points at the
    // generic docs landing page for now, fix once that page is built.
    docsUrl: '/docs/intro',
  },
  {
    name: 'kiit-registry',
    comingSoon: true,
    icon: 'database',
    tagline:
      'A lightweight Kotlin service locator where each registration carries a type, ' +
      'category, and identity, forming a queryable map of your app.',
  },
];

function ModuleCard(item: ModuleItem) {
  const {name, tagline} = item;

  if (item.comingSoon) {
    return (
      <div className="col col--4">
        <div className={styles.moduleCard} data-comingsoon="true">
          <Icon name={item.icon} size={56} className={styles.moduleIcon} />
          <Heading as="h3">{name}</Heading>
          <p>{tagline}</p>
          <span className={styles.comingSoonBadge}>Coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <div className="col col--4">
      <div className={styles.moduleCard}>
        <Link to={item.repoUrl} className={styles.moduleCardLink}>
          <img src={item.logo} alt={`${name} logo`} className={styles.moduleLogo} />
          <Heading as="h3">{name}</Heading>
          <p>{tagline}</p>
        </Link>
        {item.docsUrl && (
          <div className={styles.moduleCardDocs}>
            <MoreLink href={item.docsUrl} label="Docs" variant="green" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomepageModules(): ReactNode {
  return (
    <section className={styles.modules}>
      <div className="container">
        <div className="row">
          {modules.map((item) => (
            <ModuleCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
