'use strict';

// Data sản phẩm: mỗi ảnh là một placeholder PNG để bạn tự thêm vào images/.
const app = Vue.createApp({
  data() {
    return {
      tuKhoa: '',
      cart: [],
      nextCartId: 1,
      orderMessage: '',
      products: [
        {id:'case-air',name:'Ốp lưng AirFlex',category:'Ốp lưng',description:'Ôm sát máy, viền chống sốc gọn nhẹ.',price:250000,badge:'Bán chạy',badgeClass:'badge-sage',image:'images/case-airflex.png'},
        {id:'buds-air',name:'Tai nghe Buds Air',category:'Âm thanh',description:'Âm thanh rõ, hộp sạc nhỏ gọn.',price:690000,badge:'Mới',badgeClass:'badge-blue',image:'images/buds-air.png'},
        {id:'charger-30w',name:'Củ sạc nhanh 30W',category:'Sạc & cáp',description:'Sạc nhanh, tự điều chỉnh công suất.',price:390000,badge:'Gọn nhẹ',badgeClass:'badge-sand',image:'images/charger-30w.png'},
        {id:'cable-braid',name:'Cáp USB-C bện dù',category:'Sạc & cáp',description:'Dài 2 m, bền chắc cho sử dụng hằng ngày.',price:150000,badge:'Bền bỉ',badgeClass:'badge-sage',image:'images/cable-usbc.png'},
        {id:'power-10k',name:'Pin dự phòng 10K',category:'Pin & nguồn',description:'Dung lượng vừa đủ cho cả ngày di chuyển.',price:520000,badge:'Được yêu thích',badgeClass:'badge-blue',image:'images/powerbank-10k.png'},
        {id:'glass-clear',name:'Kính cường lực Clear',category:'Bảo vệ',description:'Trong suốt, hạn chế trầy xước màn hình.',price:120000,badge:'Thiết yếu',badgeClass:'badge-sand',image:'images/glass-clear.png'},
        {id:'pad-wireless',name:'Đế sạc không dây',category:'Sạc & cáp',description:'Đặt xuống là sạc, bề mặt chống trượt.',price:450000,badge:'Mới',badgeClass:'badge-blue',image:'images/wireless-pad.png'},
        {id:'stand-fold',name:'Giá đỡ gập Pocket',category:'Tiện ích',description:'Góc nhìn thoải mái, gấp gọn mang theo.',price:210000,badge:'Nhỏ mà tiện',badgeClass:'badge-sage',image:'images/pocket-stand.png'}
      ]
    };
  },
  mounted() {
    // Ảnh cục bộ có thể tải trước khi Vue gắn sự kiện load; hiện ảnh đã có sẵn.
    this.$nextTick(() => {
      document.querySelectorAll('.media-frame img').forEach((image) => {
        if (image.complete && image.naturalWidth > 0) {
          image.parentElement.classList.add('has-image');
        }
      });
    });
  },
  computed: {
    // Đếm món trong giỏ để header cập nhật tự động theo dữ liệu Vue.
    cartCount() {
      return this.cart.length;
    },
    // Lọc tên, nhóm và mô tả theo từ khoá, không phân biệt chữ hoa/thường.
    danhSachLoc() {
      const keyword = this.tuKhoa.toLocaleLowerCase('vi').trim();
      if (!keyword) return this.products;
      return this.products.filter((product) =>
        `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase('vi').includes(keyword)
      );
    },
    // Tính tổng giá trị các món hiện có trong giỏ.
    tongTien() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    }
  },
  methods: {
    // Thêm sản phẩm vào giỏ; Vue cập nhật số lượng, danh sách và tổng tiền.
    themVaoGio(product) {
      this.cart.push({...product, cartId:this.nextCartId++});
      this.orderMessage = '';
    },
    // Xoá món theo vị trí trong danh sách giỏ hàng.
    xoaKhoiGio(index) {
      this.cart.splice(index, 1);
    },
    // Định dạng giá bằng đơn vị tiền Việt Nam.
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    },
    // Bỏ placeholder khi ảnh thật tải thành công.
    markImageLoaded(event) {
      event.currentTarget.parentElement.classList.add('has-image');
    },
    // Giữ placeholder nếu file ảnh chưa được thêm hoặc sai tên.
    markImageMissing(event) {
      event.currentTarget.parentElement.classList.remove('has-image');
    },
    // Phản hồi cho thao tác đặt hàng trong bản minh hoạ.
    thongBaoThanhToan() {
      this.orderMessage = 'Đơn hàng đã sẵn sàng. BYTE sẽ liên hệ bạn để xác nhận.';
    }
  }
});

app.mount('#app');

// Với Vanilla JS, mỗi lần thêm/xoá giỏ hàng phải tự querySelector rồi cập nhật DOM;
// Vue tự đồng bộ giao diện khi cart thay đổi nhờ cơ chế reactivity.
