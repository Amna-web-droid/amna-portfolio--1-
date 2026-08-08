import { Github, GitFork, Users, Star } from "lucide-react";

const GITHUB_USERNAME = "Amna-web-droid";

async function getGitHubStats() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
      : 0;

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      stars: totalStars,
    };
  } catch {
    return null;
  }
}

export default async function GitHubStats() {
  const stats = await getGitHubStats();
  if (!stats) return null;

  const items = [
    { label: "Public repos", value: stats.publicRepos, Icon: Github },
    { label: "Followers", value: stats.followers, Icon: Users },
    { label: "Stars earned", value: stats.stars, Icon: Star },
  ];

  return (
    <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-line">
      {items.map(({ label, value, Icon }) => (
        <div key={label} className="flex items-center gap-2 text-sm text-muted">
          <Icon size={16} />
          <span className="text-ink font-medium">{value}</span> {label}
        </div>
      ))}
    </div>
  );
}
