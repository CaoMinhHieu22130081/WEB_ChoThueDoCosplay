// Dữ liệu sản phẩm cosplay
const productsData = [
  {
    id: 1,
    name: 'Cosplay Anime Girl',
    description: 'Bộ cosplay anime đẹp mắt cho các bạn gái',
    price: 150000,
    image: 'https://via.placeholder.com/300x250?text=Cosplay+Anime'
  },
  {
    id: 2,
    name: 'Ninja Outfit',
    description: 'Trang phục ninja truyền thống đầy mê hoặc',
    price: 200000,
    image: 'https://via.placeholder.com/300x250?text=Ninja+Outfit'
  },
  {
    id: 3,
    name: 'Maid Costume',
    description: 'Trang phục phục vụ cổ điển kiểu Nhật',
    price: 120000,
    image: 'https://via.placeholder.com/300x250?text=Maid+Costume'
  },
  {
    id: 4,
    name: 'Cosplay Game Character',
    description: 'Bộ trang phục nhân vật game nổi tiếng',
    price: 250000,
    image: 'https://via.placeholder.com/300x250?text=Game+Character'
  },
  {
    id: 5,
    name: 'Superhero Suit',
    description: 'Bộ trang phục siêu anh hùng đầy năng lượng',
    price: 180000,
    image: 'https://via.placeholder.com/300x250?text=Superhero'
  },
  {
    id: 6,
    name: 'Fantasy Elf Costume',
    description: 'Trang phục yêu tinh thần thoại kỳ lạ',
    price: 220000,
    image: 'https://via.placeholder.com/300x250?text=Elf+Costume'
  }
]

export function getProducts() {
  return productsData
}

export function getProductById(id) {
  return productsData.find(product => product.id === id)
}
