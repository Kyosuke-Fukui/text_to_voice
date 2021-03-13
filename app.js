$(function () {
  var lang = "ja-JP";
  var speed = $("#speed").val();

  // unsupported.
  if (!"SpeechSynthesisUtterance" in window) {
    alert("Speech synthesis(音声合成) APIには未対応です.");
    return;
  }

  // 発話機能をインスタンス化
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();

  $("#btn1").on("click", function () {
    // 以下オプション設定（日本語は効かないもよう。。）
    msg.voice = voices[7]; // 7:Google 日本人 ja-JP ※他は英語のみ（次項参照）
    msg.volume = 1.0; // 音量 min 0 ~ max 1
    msg.rate = speed; // 速度 min 0 ~ max 10
    msg.pitch = 1.0; // 音程 min 0 ~ max 2

    msg.text = $("#txt").val(); // 喋る内容
    msg.lang = lang; // en-US or ja-JP

    // 発話実行
    speechSynthesis.speak(msg);

    // 終了時の処理
    msg.onend = function (event) {
      console.log("喋った時間：" + event.elapsedTime + "s");
    };
  });

  //スピード変更を反映する処理
  const selectElement = document.querySelector("#speed");
  selectElement.addEventListener("change", function () {
    speed = $("#speed").val();
  });

  // 言語切り替えボタン処理
  $("#btn2").on("click", function () {
    if ($("#btn2").val() === "English") {
      $("#btn2").val("日本語");
      lang = "en-US";
    } else {
      $("#btn2").val("English");
      lang = "ja-JP";
    }
  });

  // クリアボタン処理
  $("#btn3").on("click", function () {
    $("#txt").val("");
  });
});
