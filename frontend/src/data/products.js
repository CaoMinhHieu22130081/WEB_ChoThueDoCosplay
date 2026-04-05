const PRODUCTS = [
  {
    id: 1,
    name: 'Naruto Uzumaki',
    category: 'Anime',
    description: 'Bộ trang phục Naruto chính nghĩa với áo cam trứng, dây bandage và mặt nạ.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=500&fit=crop'
  },
  {
    id: 2,
    name: 'Bleach Ichigo',
    category: 'Anime',
    description: 'Trang phục Ichigo Kurosaki với kiếm Zangetsu và áo chiến đấu.',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=500&fit=crop'
  },
  {
    id: 3,
    name: 'One Piece Luffy',
    category: 'Anime',
    description: 'Bộ trang phục Luffy với áo đỏ, quần xanh và dép geta.',
    price: 160000,
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=500&fit=crop'
  },
  {
    id: 4,
    name: 'Demon Slayer Tanjiro',
    category: 'Anime',
    description: 'Trang phục Tanjiro Kamado với kimono đen và tai quỷ đỏ.',
    price: 170000,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop'
  },
  {
    id: 5,
    name: 'Elden Ring Knight',
    category: 'Game',
    description: 'Armor của Knight từ Elden Ring với kiếm và khiên.',
    price: 200000,
    image: 'https://images.unsplash.com/photo-1606933248051-5ce98f1a3f3d?w=400&h=500&fit=crop'
  },
  {
    id: 6,
    name: 'Dark Souls Artorias',
    category: 'Game',
    description: 'Bộ giáp Artorias the Abysswalker với kiếm danh hiệu.',
    price: 220000,
    image: 'https://images.unsplash.com/photo-1566652408206-10f63949c539?w=400&h=500&fit=crop'
  },
  {
    id: 7,
    name: 'Witcher Geralt',
    category: 'Game',
    description: 'Trang phục Geralt of Rivia với áo da trắng và kiếm silver.',
    price: 210000,
    image: 'https://images.unsplash.com/photo-1579033127963-fab4c4604f00?w=400&h=500&fit=crop'
  },
  {
    id: 8,
    name: 'League of Legends K/DA Ahri',
    category: 'Game',
    description: 'Trang phục K/DA Ahri với tóc xanh và quần áo futuristic.',
    price: 190000,
    image: 'https://images.unsplash.com/photo-1594360629833-95b12750391f?w=400&h=500&fit=crop'
  },
  {
    id: 9,
    name: 'Superman',
    category: 'Siêu Anh Hùng',
    description: 'Bộ trang phục Superman chính nghĩa với áo xanh, áo choàng đỏ.',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1584697964216-e3a3f567cef7?w=400&h=500&fit=crop'
  },
  {
    id: 10,
    name: 'Batman',
    category: 'Siêu Anh Hùng',
    description: 'Trang phục Batman với áo choàng đen, mặt nạ và nắm đấm.',
    price: 200000,
    image: 'https://images.unsplash.com/photo-1599599810694-b3b147e5a8c4?w=400&h=500&fit=crop'
  },
  {
    id: 11,
    name: 'Wonder Woman',
    category: 'Siêu Anh Hùng',
    description: 'Bộ trang phục Wonder Woman với áo vàng xanh và vỏ cực.',
    price: 190000,
    image: 'https://images.unsplash.com/photo-1596727147236-78295c0d0c8e?w=400&h=500&fit=crop'
  },
  {
    id: 12,
    name: 'Iron Man Mark 50',
    category: 'Siêu Anh Hùng',
    description: 'Áo giáp Iron Man Mark 50 với tính năng LED.',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=500&fit=crop'
  },
  {
    id: 13,
    name: 'Princess Elsa',
    category: 'Fantasy',
    description: 'Trang phục Elsa với váy xanh lấp lánh và khăn lụa trắng.',
    price: 175000,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop'
  },
  {
    id: 14,
    name: 'Fairy Elf Queen',
    category: 'Fantasy',
    description: 'Trang phục Nữ Hoàng Tiên với cánh, vương miện và áo dài lấp lánh.',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=500&fit=crop'
  },
  {
    id: 15,
    name: 'Dragon Slayer',
    category: 'Fantasy',
    description: 'Trang phục chiến binh với giáp da, kiếm lớn và áo khoác lông.',
    price: 210000,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop'
  },
  {
    id: 16,
    name: 'Ninja Shinobi',
    category: 'Nhật Bản',
    description: 'Bộ trang phục Ninja với áo đen, dây band mặt và katana.',
    price: 160000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop'
  },
]

export function getProducts() {
  return PRODUCTS
}