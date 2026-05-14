const fs = require('fs');

function processHtml(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');

    const replacements = [
        ['<title>WINGII - الفخامة والأناقة</title>', '<title data-i18n="title">WINGII - الفخامة والأناقة</title>'],
        [/>الرئيسية</g, ' data-i18n="nav_home">الرئيسية<'],
        [/>الأقسام</g, ' data-i18n="nav_categories">الأقسام<'],
        [/>من نحن</g, ' data-i18n="nav_about">من نحن<'],
        [/>تواصل معنا</g, ' data-i18n="nav_contact">تواصل معنا<'],
        [/>حجز استشارة</g, ' data-i18n="nav_consult">حجز استشارة<'],
        [/>الشكاوي</g, ' data-i18n="nav_complaints">الشكاوي<'],
        [/placeholder="ابحث عن منتج\.\.\."/g, 'placeholder="ابحث عن منتج..." data-i18n-placeholder="search_placeholder"'],
        [/>اكتشف الفخامة مع <span>/g, ' data-i18n="hero_title">اكتشف الفخامة مع <span data-i18n-ignore>'],
        [/>أحدث صيحات الموضة العالمية بين يديك\. تسوق الآن واحصل على خصومات حصرية\.</g, ' data-i18n="hero_subtitle">أحدث صيحات الموضة العالمية بين يديك. تسوق الآن واحصل على خصومات حصرية.<'],
        [/>تسوق الآن</g, ' data-i18n="hero_btn">تسوق الآن<'],
        [/>الرائج \(Trending\)</g, ' data-i18n="featured_title">الرائج (Trending)<'],
        [/>تسوق حسب القسم</g, ' data-i18n="cat_title">تسوق حسب القسم<'],
        [/>الكل</g, ' data-i18n="cat_all">الكل<'],
        [/>رجالي</g, ' data-i18n="cat_men">رجالي<'],
        [/>نسائي</g, ' data-i18n="cat_women">نسائي<'],
        [/>هودي</g, ' data-i18n="cat_hoodies">هودي<'],
        [/>ساعات</g, ' data-i18n="cat_watches">ساعات<'],
        [/>حقائب</g, ' data-i18n="cat_bags">حقائب<'],
        [/>أحذية رياضية</g, ' data-i18n="cat_sneakers">أحذية رياضية<'],
        [/>الكل رجالي</g, ' data-i18n="sub_all">الكل رجالي<'],
        [/>تيشيرتات</g, ' data-i18n="sub_tshirts">تيشيرتات<'],
        [/>بناطيل</g, ' data-i18n="sub_pants">بناطيل<'],
        [/>أحذية</g, ' data-i18n="sub_shoes">أحذية<'],
        [/>إكسسوارات</g, ' data-i18n="sub_acc">إكسسوارات<'],
        [/>نظارات شمسية</g, ' data-i18n="sub_sun">نظارات شمسية<'],
        [/>من نحن - WINGII</g, ' data-i18n="about_title">من نحن - WINGII<'],
        [/>تأسست WINGII على يد عمر، وهي علامة تجارية رائدة في عالم الأزياء الفاخرة\. نسعى دائماً لتقديم أحدث صيحات الموضة بجودة لا تضاهى وتصاميم تعكس الأناقة العصرية\.</g, ' data-i18n="about_p1">تأسست WINGII على يد عمر، وهي علامة تجارية رائدة في عالم الأزياء الفاخرة. نسعى دائماً لتقديم أحدث صيحات الموضة بجودة لا تضاهى وتصاميم تعكس الأناقة العصرية.<'],
        [/>رؤيتنا هي تمكين كل فرد من التعبير عن نفسه من خلال أزياء تجمع بين الراحة والفخامة\. نحن نؤمن بأن الموضة ليست مجرد ملابس، بل هي أسلوب حياة\.</g, ' data-i18n="about_p2">رؤيتنا هي تمكين كل فرد من التعبير عن نفسه من خلال أزياء تجمع بين الراحة والفخامة. نحن نؤمن بأن الموضة ليست مجرد ملابس، بل هي أسلوب حياة.<'],
        [/>حجز استشارة أزياء</g, ' data-i18n="consult_title">حجز استشارة أزياء<'],
        [/>احصل على استشارة خاصة من خبراء الموضة لدينا لتجد ما يناسبك تماماً\.</g, ' data-i18n="consult_subtitle">احصل على استشارة خاصة من خبراء الموضة لدينا لتجد ما يناسبك تماماً.<'],
        [/placeholder="الاسم الكامل"/g, 'placeholder="الاسم الكامل" data-i18n-placeholder="name_placeholder"'],
        [/placeholder="البريد الإلكتروني"/g, 'placeholder="البريد الإلكتروني" data-i18n-placeholder="email_placeholder"'],
        [/placeholder="رقم الهاتف"/g, 'placeholder="رقم الهاتف" data-i18n-placeholder="phone_placeholder"'],
        [/placeholder="تفاصيل طلب الاستشارة"/g, 'placeholder="تفاصيل طلب الاستشارة" data-i18n-placeholder="details_placeholder"'],
        [/>تأكيد الحجز</g, ' data-i18n="consult_btn">تأكيد الحجز<'],
        [/>الاستفسارات والتواصل</g, ' data-i18n="contact_title">الاستفسارات والتواصل<'],
        [/placeholder="الاسم"/g, 'placeholder="الاسم" data-i18n-placeholder="name_short"'],
        [/placeholder="رسالتك"/g, 'placeholder="رسالتك" data-i18n-placeholder="msg_placeholder"'],
        [/>إرسال الرسالة</g, ' data-i18n="contact_btn">إرسال الرسالة<'],
        [/>الشكاوي والمقترحات</g, ' data-i18n="comp_title">الشكاوي والمقترحات<'],
        [/>رأيك يهمنا\. إذا كان لديك أي شكوى أو اقتراح، يرجى مشاركته معنا\.</g, ' data-i18n="comp_subtitle">رأيك يهمنا. إذا كان لديك أي شكوى أو اقتراح، يرجى مشاركته معنا.<'],
        [/>نوع الرسالة</g, ' data-i18n="comp_type">نوع الرسالة<'],
        [/>شكوى</g, ' data-i18n="comp_type_1">شكوى<'],
        [/>اقتراح</g, ' data-i18n="comp_type_2">اقتراح<'],
        [/>استفسار</g, ' data-i18n="comp_type_3">استفسار<'],
        [/placeholder="تفاصيل الشكوى أو الاقتراح"/g, 'placeholder="تفاصيل الشكوى أو الاقتراح" data-i18n-placeholder="comp_msg"'],
        [/>إرسال</g, ' data-i18n="comp_btn">إرسال<'],
        [/>الأناقة الفاخرة بين يديك\.</g, ' data-i18n="footer_desc">الأناقة الفاخرة بين يديك.<'],
        [/>روابط سريعة</g, ' data-i18n="footer_links">روابط سريعة<'],
        [/>الرياض، المملكة العربية السعودية</g, ' data-i18n="footer_addr">الرياض، المملكة العربية السعودية<'],
        [/>سلة المشتريات</g, ' data-i18n="cart_title">سلة المشتريات<'],
        [/>الإجمالي:</g, ' data-i18n="cart_total">الإجمالي:<'],
        [/>إتمام الطلب</g, ' data-i18n="cart_btn">إتمام الطلب<'],
        [/>تأكيد الطلب</g, ' data-i18n="checkout_title">تأكيد الطلب<'],
        [/placeholder="الاسم كامل"/g, 'placeholder="الاسم كامل" data-i18n-placeholder="order_name"'],
        [/placeholder="رقم الموبايل"/g, 'placeholder="رقم الموبايل" data-i18n-placeholder="order_phone"'],
        [/>رقم آخر \(اختياري\)</g, ' data-i18n="order_phone2_label">رقم آخر (اختياري)<'],
        [/placeholder="رقم آخر"/g, 'placeholder="رقم آخر" data-i18n-placeholder="order_phone2"'],
        [/>المحافظة</g, ' data-i18n="order_gov">المحافظة<'],
        [/>المنطقة</g, ' data-i18n="order_region">المنطقة<'],
        [/placeholder="العنوان بالتفصيل \(الشارع، رقم العمارة، الشقة\)"/g, 'placeholder="العنوان بالتفصيل (الشارع، رقم العمارة، الشقة)" data-i18n-placeholder="order_address"'],
        [/placeholder="علامة مميزة"/g, 'placeholder="علامة مميزة" data-i18n-placeholder="order_landmark"'],
        [/placeholder="أنسب وقت لاستلام الأوردر"/g, 'placeholder="أنسب وقت لاستلام الأوردر" data-i18n-placeholder="order_time"'],
        [/>تأكيد وإرسال الطلب</g, ' data-i18n="checkout_submit">تأكيد وإرسال الطلب<'],
        [/>الحساب</g, ' data-i18n="auth_title">الحساب<'],
        [/>تسجيل الدخول</g, ' data-i18n="auth_login_tab">تسجيل الدخول<'],
        [/>حساب جديد</g, ' data-i18n="auth_reg_tab">حساب جديد<'],
        [/placeholder="كلمة المرور"/g, 'placeholder="كلمة المرور" data-i18n-placeholder="auth_pass"'],
        [/>دخول</g, ' data-i18n="auth_login_btn">دخول<'],
        [/>إنشاء حساب</g, ' data-i18n="auth_reg_btn">إنشاء حساب<'],
    ];

    replacements.forEach(([p_old, p_new]) => {
        content = content.replace(p_old, p_new);
    });

    // Also add the switcher button HTML in the nav-icons block
    const navIconsStr = '<div class="nav-icons">';
    const switcherHtml = `
                <button class="lang-switcher-btn active-ar" id="langSwitcherBtn" title="تغيير اللغة">
                    <span class="lang-en">EN</span>
                    <i class="fas fa-arrow-right" id="langArrow"></i>
                    <span class="lang-ar">AR</span>
                    <i class="fas fa-globe"></i>
                </button>
`;
    if(!content.includes('lang-switcher-btn')) {
        content = content.replace(navIconsStr, navIconsStr + switcherHtml);
    }

    fs.writeFileSync(filepath, content, 'utf-8');
}

processHtml('C:/WEP SIDE/index.html');
