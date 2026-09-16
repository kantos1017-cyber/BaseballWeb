document.addEventListener("DOMContentLoaded", () => {

    loadLatestArticles();

    setupContactForm();

});


/* ==============================
   最新記事を読み込む
============================== */

function loadLatestArticles() {

    const latestArticles =
        document.getElementById("latest-articles");


    // トップページではない場合は何もしない
    if (!latestArticles) {
        return;
    }


    // 記事データを読み込む
    fetch("articles/articles.json")

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "記事データを読み込めませんでした"
                );
            }

            return response.json();

        })

        .then(articles => {

            // 最新記事を3件だけ取得
            const latest =
                articles.slice(0, 3);


            latestArticles.innerHTML =
                latest.map(article => {

                    return `

                        <article class="article-card">

                            <div class="article-image">

                                ${
                                    article.image
                                        ? `<img src="images/${article.image}" alt="${article.title}">`
                                        : article.icon
                                }

                            </div>


                            <div class="article-content">

                                <span class="category">

                                    ${article.category}

                                </span>


                                <h3>

                                    ${article.title}

                                </h3>


                                <p>

                                    ${article.description}

                                </p>


                                <a href="articles/${article.url}">

                                    記事を読む →

                                </a>

                            </div>

                        </article>

                    `;

                }).join("");

        })


        .catch(error => {

            console.error(error);


            latestArticles.innerHTML = `

                <p>
                    最新記事の読み込みに失敗しました。
                </p>

            `;

        });

}


/* ==============================
   お問い合わせフォーム
============================== */

function setupContactForm() {

    const contactForm =
        document.querySelector(".contact-form");


    // お問い合わせページではない場合は何もしない
    if (!contactForm) {
        return;
    }


    contactForm.addEventListener("submit", (event) => {

        // ページが再読み込みされるのを防ぐ
        event.preventDefault();


        // 入力内容を取得
        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const message =
            document.getElementById("message").value;


        console.log("お問い合わせ内容");

        console.log("お名前:", name);

        console.log("メールアドレス:", email);

        console.log("お問い合わせ内容:", message);


        // 送信完了メッセージ
        alert(
            "お問い合わせを受け付けました。\n\n" +
            "現在はテスト送信のため、実際のメールは送信されません。"
        );


        // フォームを空にする
        contactForm.reset();

    });

}