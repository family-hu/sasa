const OrgInfo = () => import('./components/sign/OrgInfo.vue');
const UserInfo = () => import('./components/sign/UserInfo.vue');
const PackInfo = () => import('./components/sign/PackInfo.vue');
const PackDetail = () => import('./components/sign/PackDetail.vue');
const Sign = () => import('./components/sign/Sign.vue');
const CanvasSign = () => import('./components/sign/CanvasSign.vue');
const SignSuccess = () => import('./components/sign/SignSuccess.vue');

//小组
const ReleasePost = () => import('./components/group/ReleasePost.vue');
const GroupDetail = () => import('./components/group/GroupDetail.vue');
const TopicDetail = () => import('./components/group/TopicDetail.vue');

//消息
const OrgMsgList = () => import('./components/msg/OrgMsgList.vue');
const DoctorMsgList = () => import('./components/msg/DoctorMsgList.vue');


//医生列表
const DoctorList = () => import('./components/doctor/DoctorList.vue');
const DoctorOneList = () => import('./components/doctor/DoctorOneList.vue');
const DoctorDetail = () => import('./components/doctor/DoctorDetail.vue');
const DoctorSynopsis = () => import('./components/doctor/DoctorSynopsis.vue');
const FocusDoctorList = () => import('./components/doctor/FocusDoctorList.vue');
const EvaList = () => import('./components/doctor/EvaList.vue');
const DoctorAppointHome = () => import('./components/doctor/DoctorAppointHome.vue');
const FocusHospitalList = () => import('./components/doctor/FocusHospitalList.vue');
const Report = () => import('./components/doctor/Report.vue');
const DoctorConsultationFragment = () => import('./components/doctor/DoctorConsultationFragment.vue');
const ShareDoctor = () => import('./components/doctor/ShareDoctor.vue');

//聊天
const Chat = () => import('./components/chat/Chat.vue');
const RecordList = () => import('./components/chat/ChatRecordList.vue');
const ChatSubmitPay = () => import('./components/chat/ChatSubmitPay.vue');
const ChatPayOk = () => import('./components/chat/ChatPayOk.vue');

//下单
const OrderSubmitPay = () => import('./components/order/OrderSubmitPay.vue');
const OrderList = () => import('./components/order/OrderList.vue');
const ServiceOrderList = () => import('./components/order/ServiceOrderList.vue');
const ServiceOrderDetail = () => import('./components/order/ServiceOrderDetail.vue');
const AppointOrderList = () => import('./components/order/AppointOrderList.vue');
const OrderDetail = () => import('./components/order/OrderDetail.vue');
const AppointSubmit = () => import('./components/order/AppointSubmit.vue');
const OrderFragment = () => import('./components/order/OrderFragment.vue');
const AppointOrderDetail = () => import('./components/order/AppointOrderDetail.vue');
const DocumentDetail = () => import('./components/order/DocumentDetail.vue');
const ServiceSubmitPay = () => import('./components/order/ServiceSubmitPay.vue');
const EvaluationOrder = () => import('./components/order/EvaluationOrder.vue');

//user
const Mine = () => import('./components/user/Mine.vue');
const UserDetail = () => import('./components/user/UserDetail.vue');
const PatientReport = () => import('./components/user/PatientReport.vue');
const CouponsList = () => import('./components/user/CouponsList.vue');

//首页
const Main = () => import('./components/Main.vue');
const Home = () => import('./components/home/Home.vue');

//登录
const Login = () => import('./components/login/Login.vue');
const PhoneCodeLogin = () => import('./components/login/PhoneCodeLogin.vue');
const AccountLogin = () => import('./components/login/AccountLogin.vue');

//服务包
const ServiceList = () => import('./components/service/ServiceList.vue');
const ServiceDetail = () => import('./components/service/ServiceDetail.vue');
const FeaturesDepartment = () => import('./components/service/FeaturesDepartment.vue');
//体检商品详情
const HealthServiceDetail = () => import('./components/service/HealthServiceDetail.vue');

// shop
const AddItem = () => import('./components/shop/AddItem.vue');
const ConfirmOrder = () => import('./components/shop/ConfirmOrder.vue');
const MedicalManList = () => import('./components/shop/MedicalManList.vue');
const MedicalManItem = () => import('./components/shop/MedicalManItem.vue');
const ShopPayList = () => import('./components/shop/ShopPayList.vue');
const ShopPayOk = () => import('./components/shop/ShopPayOk.vue');
const ShopOrderList = () => import('./components/shop/ShopOrderList.vue');
const ServiceVoucher = () => import('./components/shop/ServiceVoucher.vue');
const ShopAddComments = () => import('./components/shop/ShopAddComments.vue');
const ShopOrderDetail = () => import('./components/shop/ShopOrderDetail.vue');
const ShopPackageDetail = () => import('./components/shop/ShopPackageDetail.vue');
const ShopCommentList = () => import('./components/shop/ShopCommentList.vue');
const ShopList = () => import('./components/shop/ShopList.vue');
const ShopPackageReport = () => import('./components/shop/ShopPackageReport.vue');


//自定义组件
// const CustomPopup = () => import('./customComponents/CustomPopup.vue');
// const BottomloadMore = () => import('./customComponents/BottomloadMore.vue');

//资讯
const NewsList = () => import('./components/news/NewsList.vue');
const NewsDetail = () => import('./components/news/NewsDetail.vue');
const ShareNews = () => import('./components/news/ShareNews.vue');


//心理咨询
const ConsultationMain = () => import('./components/consultation/ConsultationMain.vue');
const ConsultationDetail = () => import('./components/consultation/ConsultationDetail.vue');
const ConsultationList = () => import('./components/consultation/ConsultationList.vue');
const ConsultationTest = () => import('./components/consultation/ConsultationTest.vue');
const ConsultationResult = () => import('./components/consultation/ConsultationResult.vue');
const ConsultationUserInfo = () => import('./components/consultation/ConsultationUserInfo.vue');
const ConsultationCommentAdd = () => import('./components/consultation/ConsultationCommentAdd.vue');
const ConsultationEvaList = () => import('./components/consultation/ConsultationEvaList.vue');

export const routes = [
    {path: "/login", component: Login, meta: {title: "登录"}},
    {path: "/phoneCodeLogin", component: PhoneCodeLogin, meta: {title: "手机号登录"}},
    {path: "/accountLogin", component: AccountLogin, meta: {title: "用户名登录"}},

  //sign
    {path: "/org", component: OrgInfo},
    {path: "/user", component: UserInfo, name: "user"},
    {path: "/pack", component: PackInfo},
    {path: "/packdetail", component: PackDetail},
    {path: "/sign", component: Sign},
    {path: "/signature", component: CanvasSign},
    {path: "/success", component: SignSuccess},

  //group
    {path: "/groupDetail", component: GroupDetail, meta: {title: '小组详情', keepAlive: false}},
    {path: "/releasePost", component: ReleasePost, meta: {title: '发布帖子', keepAlive: false}},
    {path: "/topicDetail", component: TopicDetail, meta: {title: '话题详情', keepAlive: false}},

  //msg
    {path: "/doctorMsgList", component: DoctorMsgList, meta: {title: '消息', keepAlive: false}},
    {path: "/orgMsgList", component: OrgMsgList, meta: {title: '消息', keepAlive: false}},

  //doctor
    {path: "/doctorList", component: DoctorList, meta: {title: '医生列表', keepAlive: false}},//全部列表
    {path: "/doctorOneList", component: DoctorOneList, meta: {title: '医生列表', keepAlive: false}},//对应科室列表
    {path: "/doctorDetail", component: DoctorDetail, meta: {title: '医生详情', keepAlive: false}},
    {path: "/doctorSynopsis", component: DoctorSynopsis, meta: {title: '医生简介', keepAlive: false}},//医生简介
    {path: "/focusDoctorList", component: FocusDoctorList, meta: {title: "我的医生", keepAlive: false}},
    {path: "/evaList", component: EvaList, meta: {title: "评价列表", keepAlive: false}},
    {path: "/doctorAppoint", component: DoctorAppointHome, meta: {title : '预约', keepAlive: false}},
    {path: "/focusHospitalList", component: FocusHospitalList, meta: {title : "我的医院", keepAlive: false}},
    {path: "/report", component: Report, meta: {title: '诊后报到单', keepAlive: false}},
    {path: "/doctorConsultation", component: DoctorConsultationFragment, meta: {title: '我的医生', keepAlive: false}},//医生、咨询、报到
    {path: "/shareDoctor", component: ShareDoctor, meta: {title: '分享医生', keepAlive: false}},//分享医生

    //chat
    {path: "/chat", component: Chat, meta: {title: "聊天", keepAlive: false}},
    {path: "/recordList", component: RecordList, meta: {title: "聊天记录", keepAlive: false}},
    {path: "/chatSubmitPay", component: ChatSubmitPay, meta: {title: "咨询订单", keepAlive: false}},
    {path: "/chatPayOk", component: ChatPayOk, meta: {title: "支付成功", keepAlive: false}},


  //order
    {path: "/serviceOrderDetail", component: ServiceOrderDetail, meta: {title: "服务包详情", keepAlive: false}},
    {path: "/orderSubmitPay", component: OrderSubmitPay, meta: {title: "订单提交", keepAlive: false}},
    {path: "/orderList", component: OrderList, meta: {title: "问诊订单", keepAlive: false}},
    {path: "/serviceOrderList", component: ServiceOrderList, meta: {title: '服务包订单', keepAlive: false}},
    {path: "/appointOrderList", component: AppointOrderList, meta: {title: '预约订单', keepAlive: false}},
    {path: "/orderDetail", component: OrderDetail, meta: {title: "订单详情", keepAlive: false}},
    {path: "/appointSubmit", component: AppointSubmit, meta: {title: "提交预约信息", keepAlive: false}},
    {path: "/order", component: OrderFragment, meta: {title: '我的订单', keepAlive: false}},
    {path: "/appointOrderDetail", component: AppointOrderDetail, meta: {title: '预约详情', keepAlive: false}},
    {path: "/documentDetail", component: DocumentDetail, meta: {title: '诊疗详情', keepAlive: false}},
    {path: "/serviceSubmitPay", component: ServiceSubmitPay, meta: {title: '订单提交', keepAlive: false}},
    {path: "/evaluationOrder", component: EvaluationOrder, meta: {title: '发表评论', keepAlive: false}},
    //

  //service
    {path: "/serviceList", component: ServiceList, meta: {title: "服务包列表", keepAlive: false}},
    {path: "/serviceDetail", component: ServiceDetail, meta: {title: "服务包详情", keepAlive: false}},
    {path: "/featuresDepartment", component: FeaturesDepartment, meta: {title: "特色科室", keepAlive: false}},
    {path: "/healthServiceDetail", component: HealthServiceDetail, meta: {title: "商品详情", keepAlive: false}},

  //shop
    { path: "/addItem", component: AddItem, meta: { title: "选择加项", keepAlive: false } },
    { path: "/confirmOrder", component: ConfirmOrder, meta: { title: "确认订单", keepAlive: false } },
    { path: "/medicalManList", component: MedicalManList, meta: { title: "体检人信息", keepAlive: false } },
    { path: "/medicalManItem", component: MedicalManItem, meta: { title: "体检人信息", keepAlive: false } },
    { path: "/shopPayList", component: ShopPayList, meta: { title: "支付", keepAlive: false } },
    { path: "/shopPayOk", component: ShopPayOk, meta: { title: "支付完成", keepAlive: false } },
    { path: "/shopOrderList", component: ShopOrderList, meta: { title: "全部订单", keepAlive: false } },
    { path: "/serviceVoucher", component: ServiceVoucher, meta: { title: "服务券", keepAlive: false } },
    { path: "/shopAddComments", component: ShopAddComments, meta: { title: "评价", keepAlive: false } },
    { path: "/shopOrderDetail", component: ShopOrderDetail, meta: { title: "订单详情", keepAlive: false } },
    { path: "/shopPackageDetail", component: ShopPackageDetail, meta: { title: "套餐内容", keepAlive: false } },
    { path: "/shopCommentList", component: ShopCommentList, meta: { title: "用户评价", keepAlive: false } },
    { path: "/shopList", component: ShopList, meta: { title: "健康服务列表", keepAlive: false } },
    { path: "/shopPackageReport", component: ShopPackageReport, meta: { title: "报告单", keepAlive: false } },



  //news
    {path: "/newsList", component: NewsList, meta: {title: "资讯列表", keepAlive: false}},
    {path: "/newsDetail", component: NewsDetail, meta: {title: "资讯详情", keepAlive: false}},
    {path: "/shareNews", component: ShareNews, meta: {title: "分享资讯", keepAlive: false}},

  //user
    {path: "/mine", component: Mine, meta: {title: "我的", keepAlive: false}},
    {path: "/userDetail", component: UserDetail, meta: {title: "个人信息", keepAlive: false}},
    {path: "/patientReport", component: PatientReport, meta: {title: '信息完善', keepAlive: false}},
    {path: "/couponsList", component: CouponsList, meta: {title: '优惠券', keepAlive: false}},


  //consultation  咨询
    {path: '/consultation', component: ConsultationMain, meta: {title: '心理测评', keepAlive: true}},
    {path: '/consultationDetail', component: ConsultationDetail, meta: {title: '', keepAlive: false}},
    {path: '/consultationList', component: ConsultationList, meta: {title: '测试', keepAlive: false}},
    {path: '/consultationTest', component: ConsultationTest, meta: {title: '测评', keepAlive: false}},
    {path: '/consultationResult', component: ConsultationResult, meta: {title: '测试结果', keepAlive: false}},
    {path: '/consultationUserInfo', component: ConsultationUserInfo, meta: {title: '我的', keepAlive: false}},
    {path: '/consultationCommentAdd', component: ConsultationCommentAdd, meta: {title: '发布评论', keepAlive: false}},
    {path: '/consultationEvaList', component: ConsultationEvaList, meta: {title: '全部评价', keepAlive: false}},

    {path: "/home", component: Main, meta: {title: "", keepAlive: false}},
    // {path: "/home", component: Home, meta: {title: "", keepAlive: true}},
    {path: "", component: Login, meta: {title: "登录", keepAlive: false}},
    // {path: '*', redirect:"/"}
];

