import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Icon from '@site/src/components/Icon';
import type {IconName} from '@site/src/theme/icons';
import styles from './styles.module.css';

type ModuleItem = {
  name: string;
  tagline: string;
} & (
  | {comingSoon?: false; logo: string; repoUrl: string}
  | {comingSoon: true; icon: IconName}
);

// TODO: Step 4 adds a docsUrl to each module once the kiit-codes / kiit-result
// doc instances exist, so the card can link into the docs instead of GitHub.
const modules: ModuleItem[] = [
  {
    name: 'kiit-codes',
    logo: '/img/modules/kiit-codes-logo.png',
    tagline:
      'A small, dependency-free status and error taxonomy for application outcomes.',
    repoUrl: 'https://github.com/kiitdev/kiit-codes',
  },
  {
    name: 'kiit-result',
    logo: '/img/modules/kiit-result-logo.png',
    tagline:
      "A Kotlin Result<T, E> type built on kiit-codes' status taxonomy.",
    repoUrl: 'https://github.com/kiitdev/kiit-result',
  },
  {
    name: 'kiit-registry',
    comingSoon: true,
    icon: 'database',
    tagline: 'A semantic service locator that knows the types registered for AI context.',
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
      <Link to={item.repoUrl} className={styles.moduleCard}>
        <img src={item.logo} alt={`${name} logo`} className={styles.moduleLogo} />
        <Heading as="h3">{name}</Heading>
        <p>{tagline}</p>
      </Link>
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
