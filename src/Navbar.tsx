import GitHubButton from 'react-github-btn';

export function Navbar({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
}) {
  return (
    <div className="navbar">
      <ul>
        {['Editor', 'Browse'].map((n, i) => {
          return (
            <li
              onClick={() => setSelectedTab(i)}
              key={n}
              className={selectedTab === i ? 'selected' : ''}
            >
              <a href="#">{n}</a>
            </li>
          );
        })}
        <li>
          <GitHubButton
            href="https://github.com/genesy/crosshair-codes"
            data-color-scheme="no-preference: dark; light: dark; dark: dark;"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star genesy/crosshair-codes on GitHub"
          >
            Star
          </GitHubButton>
        </li>
      </ul>
    </div>
  );
}
