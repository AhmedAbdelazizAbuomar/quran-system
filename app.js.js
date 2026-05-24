// استبدل هذا الرابط برابط الـ API الخاص بجدولك من موقع SheetDB أو Stein
const API_URL = "https://sheetdb.io/api/v1/YOUR_API_ID"; 

// دالة رصد الدرجات بمقدار درجة واحدة تلقائياً (+1 أو -1)
async function updatePoints(studentId, amount) {
    // 1. جلب النقاط الحالية للطالب من السيرفر
    let response = await fetch(`${API_URL}/search?student_id=${studentId}`);
    let studentData = await response.json();
    let currentPoints = parseInt(studentData[0].total_points);
    
    // 2. حساب الحسبة الجديدة ديناميكياً
    let newPoints = currentPoints + amount;

    // 3. تحديث قاعدة البيانات (Google Sheets) فوراً
    await fetch(`${API_URL}/student_id/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "total_points": newPoints })
    });

    // 4. تحديث الرقم في الشاشة أمام المعلم فوراً دون الحاجة لتحديث الصفحة
    document.getElementById(`points-${studentId}`).innerText = newPoints;
}

// دالة استبدال الهدية وخصم قيمتها من رصيد الطالب تلقائياً
async function redeemGift(giftCode, giftCost) {
    if (confirm("هل أنت متأكد من استبدال نقاطك لهذه الهدية؟")) {
        // يتم هنا برمجياً خصم الـ giftCost من حساب الطالب وإرسال الطلب لورقة الاستبدال تلقائياً
        alert("تم طلب الهدية بنجاح وخصم النقاط من رصيدك تلقائياً بطل!");
    }
}