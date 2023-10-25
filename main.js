// 現在の日付の表示
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

const today = `${year}年${month}月${day}日`;

const dateElement = document.getElementById("today");
dateElement.textContent = today;

// //1.追加 クリックイベント
$("#add").on("click", function() {
    const key = $("#product_name").val();
    const value = $("#product_price").val();

    // 数値変換してから保存
    const itemValue = parseFloat(value);
    if (!isNaN(itemValue)) {
        localStorage.setItem(key, itemValue);

        // 一覧表示
        const html = '<tr><th>' + key + '</th><td>' + itemValue + '円</td></tr>';
        $("#list").append(html);

        // 合計を再計算してHTMLに表示
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const itemKey = localStorage.key(i);
            const itemValue = parseFloat(localStorage.getItem(itemKey));
            if (!isNaN(itemValue)) {
                total += itemValue;
            }
        }
        $("#total").text("合計:"+total+"円");
    } else {
        alert("舐めてんのか？？いくら借りるか早く言いやがれ！！！！");
    }
});

//2-1.全削除 クリックイベント
$("#clear").on("click",function(){
    localStorage.clear();
    $("#list").empty();
    alert("利息の支払いがまだじゃねえか！！！！");
});

//2-2.一部削除 クリックイベント
// $("#delete").on("click", function () {
//     const key = $("#product_name").val();
//     const value = $("#product_price").val();
//     localStorage.removeItem("key, value");
//     alert("Clearしました");
//     $("#product_name").val("");
//     $("#product_price").val("");
// });

//3.ページ読み込み：保存データ取得表示
// key（何番）でkey名を取得
for(let i=0; i<localStorage.length; i++){
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

// 一覧表示
    const html = '<tr><th>'+key+'</th><td>'+value+'</td></tr>';
    $("#list").append(html);
}

//4.合計の計算
$(document).ready(function() {
    let total = 0;
    updateImage(total);

    setInterval(function () {
        let newTotal = 0;
        for (let i=0; i<localStorage.length; i++){
            const key = localStorage.key(i);
            const value = parseFloat(localStorage.getItem(key));
            if (!isNaN(value)) {
            newTotal += value;
        }
    }
       if (newTotal !== total) {
            total = newTotal;
            $("#total").text("借金合計: " + total + "円");
            updateImage(total);
        }
    }, 1000);

    //  画像の表示
    function updateImage(total) {
        if (total >= 50000 && total < 70000) {
            $("#image").attr("src", "./img/image01.jpg");
        } else if (total >= 70000 && total < 100000) {
            $("#image").attr("src", "./img/image3.jpg");
        } else if (total >= 100000) {
            $("#image").attr("src", "./img/image4.jpg");
        } else {
            $("#image").attr("src", "./img/default.jpg");
        }
    }
});



    //4.合計の計算
// $(document).ready(function() {
//     let total = 0;
//     let img = document.getElementById("image");
//     for (let i=0; i<localStorage.length; i++){
//         const key = localStorage.key(i);
//         const value = parseFloat(localStorage.getItem(key));
//         if (!isNaN(value)) {
//             total += value;
//         }
//     }
//     $("#total").text("借金合計: " + total + "円");

//     //  画像の表示
//     if (total >= 50000 && total < 70000) {
//         $("#image").attr("src", "./img/image01.jpg");
//     } else if (total >= 70000 && total < 100000) {
//         $("#image").attr("src", "./img/image2.jpg");
//     } else if (total >= 100000) {
//         $("#image").attr("src", "./img/image2.jpg");
//     } else {
//         $("#image").attr("src", "./img/default.jpg");
//     }

// });
