### acm2021-primary-article-template

[![github-pages](https://github.com/arcatdmz/acm2021-primary-article-template/workflows/github-pages/badge.svg)](https://github.com/arcatdmz/acm2021-primary-article-template/actions?query=workflow%3Agithub-pages)

### Summary / 概要

**acm2021-primary-article-template** is a simple repository that contains GitHub Actions that run on every `git push` and automatically build and publish a paper PDF from LaTeX code. The PDF is hosted on GitHub Pages, and as [its recent update allowed access restrictions](https://github.blog/changelog/2021-01-21-access-control-for-github-pages/), it can be protected to be accessed exclusively by the collaborators.

It uses [the latest ACM Primary Template (published Nov. 16, 2020)](https://www.acm.org/publications/taps/word-template-workflow) and thus can be immediately used to write manuscripts for ACM-affiliated conferences.

**acm2021-primary-article-template** は `git push` のたびに LaTeX ソースコードから PDF ファイルを作成して配信する GitHub Actions を含むリポジトリです。PDF ファイルは GitHub Pages でホストされるため、 [最近導入されたアクセス管理の機能](https://github.blog/changelog/2021-01-21-access-control-for-github-pages/) を使うことで共著者からのみアクセスできるように設定できます。

サンプルとして含まれている LaTeX ソースコードは [最新の ACM Primary Template (2020/11/16 リリース)](https://www.acm.org/publications/taps/word-template-workflow) を使っているため、ACM の国際会議に投稿する論文執筆に今すぐ使えます.

- GitHub Actions config file: [.github/workflows/gh-pages.yml](https://github.com/arcatdmz/acm2021-primary-article-template/blob/main/.github/workflows/gh-pages.yml)
- Source TeX file: [main.tex](https://github.com/arcatdmz/acm2021-primary-article-template/blob/main/main.tex)
- Output PDF: https://arcatdmz.github.io/acm2021-primary-article-template/main.pdf

### Local development (paper writing) / ローカルでの執筆作業

You could simply type `latexmk -pvc` for the purpose -- as stated in [its documentation](https://mg.readthedocs.io/latexmk.html), the command keeps its eyes on source files and re-compiles the PDF file whenever needed.

If you don't have the `latexmk` command, you can install the [TeX Live](https://tug.org/texlive/) bundle or pull the Docker image `arcatdmz/texlive` and run the container.

`latexmk -pvc` コマンドで執筆できます。 [ドキュメントに記載のとおり](https://mg.readthedocs.io/latexmk.html)、このコマンドはソースファイルに変更があるたびに PDF ファイルをコンパイルし直してくれます。

`latexmk` コマンドがインストールされていない環境なら、[TeX Live](https://tug.org/texlive/)をインストールすればついてきますし、Docker イメージ `arcatdmz/texlive` に含まれているものを次のように使うこともできます。

Bash:

```sh
docker run --rm -it -v $(pwd):/texsrc arcatdmz/texlive latexmk -pvc
```

PowerShell:

```ps1
docker run --rm -it -v ${pwd}:/texsrc arcatdmz/texlive latexmk -pvc
```

### Links / 関連リンク

- Technical details (ja): https://zenn.dev/junkato/articles/github-actions-to-generate-pdfs-for-pages
- TeX Live Docker image with `git` command support: `arcatdmz/texlive` ([Docker Hub](https://hub.docker.com/repository/docker/arcatdmz/texlive), [GitHub](https://github.com/arcatdmz/texlive))

### Credits / 開発者

- [Jun Kato](https://junkato.jp)
- Contributors to the ACM Primary Template ([borisveytsman/acmart](https://github.com/borisveytsman/acmart))

---

https://github.com/arcatdmz/acm2021-primary-article-template
