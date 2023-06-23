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
      </ul>
    </div>
  );
}
