// src/data/products.js

const detailedProducts = [
    {
        id: 1,
        name: 'Trang phục Zenitsu Agatsuma',
        category: 'Anime',
        description: 'Bộ kimono vàng đặc trưng của Zenitsu Agatsuma từ Kimetsu no Yaiba. Chất liệu vải cao cấp, thoáng mát, may sát theo thiết kế gốc.',
        price: 120000,
        pricePerWeek: 600000,
        deposit: 200000,
        rating: 4.9,
        reviewCount: 128,
        isNew: true,
        isHot: true,
        image: 'https://placehold.co/600x800/1a0533/c084fc?text=Zenitsu',
        images: [
            'https://placehold.co/600x800/1a0533/c084fc?text=Zenitsu+1',
            'https://placehold.co/600x800/0f0620/a855f7?text=Zenitsu+2',
            'https://placehold.co/600x800/1a0533/f0abfc?text=Zenitsu+3',
            'https://placehold.co/600x800/0f0620/c084fc?text=Zenitsu+4',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'Tùy chỉnh'],
        tags: ['Anime', 'Demon Slayer', 'Kimono', 'Nam'],
        includes: ['Áo kimono họa tiết sét vàng', 'Quần hakama đi kèm', 'Đai thắt lưng (obi)', 'Tất cao cổ trắng'],
        specs: {
            'Chất liệu': 'Lụa nhân tạo cao cấp + cotton',
            'Màu sắc': 'Vàng kẻ sọc họa tiết sét',
            'Bộ gồm': '4 món',
            'Xuất xứ': 'Việt Nam (may thủ công)',
            'Phù hợp': 'Nam, cao 155–185cm',
        },
        reviews: [
            { name: 'Hà Linh', date: '20/03/2025', rating: 5, comment: 'Bộ đồ cực kỳ đẹp, chất vải mềm mịn, màu sắc chuẩn y như trong anime!' },
            { name: 'Minh Tuấn', date: '15/03/2025', rating: 4, comment: 'Giao hàng đúng hẹn, trang phục đẹp.' },
        ],
    },
    {
        id: 2,
        name: 'Trang phục Sailor Moon',
        category: 'Anime',
        description: 'Bộ sailor fuku kinh điển của Usagi Tsukino – Sailor Moon. Thiết kế sát nguyên bản, vải chất lượng cao, kèm đầy đủ phụ kiện.',
        price: 150000,
        pricePerWeek: 750000,
        deposit: 250000,
        rating: 4.8,
        reviewCount: 96,
        isNew: false,
        isHot: true,
        image: 'https://placehold.co/600x800/1a0533/f0abfc?text=Sailor+Moon',
        images: [
            'https://placehold.co/600x800/1a0533/f0abfc?text=Sailor+Moon+1',
            'https://placehold.co/600x800/0f0620/ec4899?text=Sailor+Moon+2',
        ],
        sizes: ['S', 'M', 'L'],
        tags: ['Anime', 'Magical Girl', 'Nữ', 'Classic'],
        includes: ['Áo sailor', 'Váy xếp ly', 'Găng tay', 'Tiara', 'Nơ ngực & lưng'],
        specs: {
            'Chất liệu': 'Polyester cao cấp + satin',
            'Màu sắc': 'Trắng, xanh navy, đỏ, vàng',
            'Bộ gồm': '5 món',
            'Xuất xứ': 'Việt Nam',
            'Phù hợp': 'Nữ, cao 150–170cm',
        },
        reviews: [],
    },
];
const simpleProducts = [
    { name: 'Naruto Uzumaki', category: 'Anime', description: 'Bộ trang phục Naruto chính nghĩa với áo cam trứng, dây bandage và mặt nạ.', price: 150000, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=500&fit=crop' },
    { name: 'Bleach Ichigo', category: 'Anime', description: 'Trang phục Ichigo Kurosaki với kiếm Zangetsu và áo chiến đấu.', price: 180000, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=500&fit=crop' },
    { name: 'One Piece Luffy', category: 'Anime', description: 'Bộ trang phục Luffy với áo đỏ, quần xanh và dép geta.', price: 160000, image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=500&fit=crop' },
    { name: 'Demon Slayer Tanjiro', category: 'Anime', description: 'Trang phục Tanjiro Kamado với kimono đen và tai quỷ đỏ.', price: 170000, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop' },
    { name: 'Elden Ring Knight', category: 'Game', description: 'Armor của Knight từ Elden Ring với kiếm và khiên.', price: 200000, image: 'https://images.unsplash.com/photo-1606933248051-5ce98f1a3f3d?w=400&h=500&fit=crop' },
    { name: 'Dark Souls Artorias', category: 'Game', description: 'Bộ giáp Artorias the Abysswalker với kiếm danh hiệu.', price: 220000, image: 'https://images.unsplash.com/photo-1566652408206-10f63949c539?w=400&h=500&fit=crop' },
    { name: 'Witcher Geralt', category: 'Game', description: 'Trang phục Geralt of Rivia với áo da trắng và kiếm silver.', price: 210000, image: 'https://images.unsplash.com/photo-1579033127963-fab4c4604f00?w=400&h=500&fit=crop' },
    { name: 'League of Legends K/DA Ahri', category: 'Game', description: 'Trang phục K/DA Ahri với tóc xanh và quần áo futuristic.', price: 190000, image: 'https://images.unsplash.com/photo-1594360629833-95b12750391f?w=400&h=500&fit=crop' },
    { name: 'Superman', category: 'Siêu Anh Hùng', description: 'Bộ trang phục Superman chính nghĩa với áo xanh, áo choàng đỏ.', price: 180000, image: 'https://images.unsplash.com/photo-1584697964216-e3a3f567cef7?w=400&h=500&fit=crop' },
    { name: 'Batman', category: 'Siêu Anh Hùng', description: 'Trang phục Batman với áo choàng đen, mặt nạ và nắm đấm.', price: 200000, image: 'https://images.unsplash.com/photo-1599599810694-b3b147e5a8c4?w=400&h=500&fit=crop' },
    { name: 'Wonder Woman', category: 'Siêu Anh Hùng', description: 'Bộ trang phục Wonder Woman với áo vàng xanh và vỏ cực.', price: 190000, image: 'https://images.unsplash.com/photo-1596727147236-78295c0d0c8e?w=400&h=500&fit=crop' },
    { name: 'Iron Man Mark 50', category: 'Siêu Anh Hùng', description: 'Áo giáp Iron Man Mark 50 với tính năng LED.', price: 250000, image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=500&fit=crop' },
    { name: 'Princess Elsa', category: 'Fantasy', description: 'Trang phục Elsa với váy xanh lấp lánh và khăn lụa trắng.', price: 175000, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop' },
    { name: 'Fairy Elf Queen', category: 'Fantasy', description: 'Trang phục Nữ Hoàng Tiên với cánh, vương miện và áo dài lấp lánh.', price: 185000, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=500&fit=crop' },
    { name: 'Dragon Slayer', category: 'Fantasy', description: 'Trang phục chiến binh với giáp da, kiếm lớn và áo khoác lông.', price: 210000, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop' },
    { name: 'Ninja Shinobi', category: 'Nhật Bản', description: 'Bộ trang phục Ninja với áo đen, dây band mặt và katana.', price: 160000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop' },
];


const normalizedSimpleProducts = simpleProducts.map((p, index) => ({
    ...p,
    id: index + 3,
    pricePerWeek: p.price * 5,
    deposit: p.price * 1.5,
    rating: 4.5,
    reviewCount: Math.floor(Math.random() * 50) + 10,
    isNew: false,
    isHot: false,
    images: [p.image, p.image],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: [p.category, 'Cosplay', 'Trang phục'],
    includes: ['Trang phục đầy đủ như hình đính kèm'],
    specs: {
        'Chất liệu': 'Đang cập nhật',
        'Xuất xứ': 'Nhập khẩu',
        'Tình trạng': 'Tốt',
    },
    reviews: []
}));
export const products = [...detailedProducts, ...normalizedSimpleProducts];

export function getProducts() {
    return products;
}