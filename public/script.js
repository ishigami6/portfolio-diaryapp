// data fetching
const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
//formDomを追加する。
const formDOM = document.querySelector(".form-section");
const threadSectionDOM = document.querySelector(".thread-section");
let inputText = "";
let contentText = "";

//Threadを全て読み込む
const getAllThreads = async () => {
  try {
    console.log("show");
    let allThreads = await axios.get("/api/v1/threads");
    console.log(allThreads);
    let { data } = allThreads;
    //出力
    allThreads = data.sort((a, b) => 
    new Date(b.postDate) - new Date(a.postDate))
      .map((thread) => {
        const { title, content, postDate } = thread;
        console.log(title, content, postDate);
        return `
      <div class="single-thread">
          <h2>${title}</h2>
          <h3>${content}</h3>
          <p>${postDate}
        </div>
      `;
      })
      .join("");
    //挿入
    threadSectionDOM.innerHTML = allThreads;
  } catch (err) {
    console.log(err);
  }
};

getAllThreads();

//タイトルと内容を打ち込んだらpostメソッドを実装してデータ追加。
inputTextDOM.addEventListener("change", (e) => {
  //   console.log(e.target.value);
  inputText = e.target.value;
});
inputContentDOM.addEventListener("change", (e) => {
  contentText = e.target.value;
});

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const  date = new Date();
  const japanTime = new Date(date.getTime() + (9 * 60 * 60 * 1000));
  const year = japanTime.getFullYear();
  const month = japanTime.getMonth() + 1;
  const day = japanTime.getDate();
  const dateString = year + "/" + month + "/" + day ;
  if (inputText && inputContent) {
    console.log("success");
    //postメソッドで送信する。

    try {
      console.log(inputText);
      await axios.post("/ap1/v1/thread", {
        title: inputText,
        content: contentText,
        postDate: dateString,
      });
      getAllThreads();
    } catch (err) {
      console.log(err);
    }

    //投稿したらinputのvalueを削除
    inputText = "";
    contentText = "";
    inputTextDOM.value = "";
    inputContentDOM.value = "";
  } else {
    console.log("error");
  }
});