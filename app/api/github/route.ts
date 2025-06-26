import { NextResponse } from "next/server"

// Force the username if env var is not working
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "FelpsDeveloper3001"
export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-App",
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20&type=all`,
      {
        headers,
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    )

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`)
      
      // Log response body for debugging
      const errorText = await response.text()
      console.error(`GitHub API error body: ${errorText}`)

      if (response.status === 404) {
        return NextResponse.json(
          {
            error: `Usuário '${GITHUB_USERNAME}' não encontrado no GitHub`,
            repos: [],
          },
          { status: 404 },
        )
      }
      if (response.status === 403) {
        const resetTime = response.headers.get("x-ratelimit-reset")
        return NextResponse.json(
          {
            error: "Rate limit do GitHub excedido. Tente novamente mais tarde.",
            resetTime: resetTime ? new Date(Number.parseInt(resetTime) * 1000).toLocaleString() : null,
            repos: [],
          },
          { status: 429 },
        )
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos = await response.json()

    // Log first repo for debugging
    if (repos.length > 0) {
      
    }

    // Filter and process repos
    const processedRepos = repos
      .filter((repo: any) => {
        // Only show public repos or if we have a token
        return !repo.private
      })
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        private: repo.private,
        fork: repo.fork,
        topics: repo.topics || [],
      }))
      .sort((a: any, b: any) => {
        // Sort by stars first, then by updated date
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      })
      .slice(0, 6) // Limit to 6 repos


    return NextResponse.json(processedRepos)
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor ao buscar repositórios",
        repos: [],
      },
      { status: 500 },
    )
  }
}
