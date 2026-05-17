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
        image: 'https://myjapanclothes.com/cdn/shop/files/zenitsu-agatsuma-cosplay-demon-slayer_1_grande.jpg?v=1700752723',
        images: [
            'https://myjapanclothes.com/cdn/shop/files/zenitsu-agatsuma-cosplay-demon-slayer_1_grande.jpg?v=1700752723',
            'https://myjapanclothes.com/cdn/shop/files/zenitsu-agatsuma-cosplay-demon-slayer_2_grande.jpg?v=1700752723',
            'https://myjapanclothes.com/cdn/shop/files/zenitsu-agatsuma-cosplay-demon-slayer_3_grande.jpg?v=1700752723',
            'https://myjapanclothes.com/cdn/shop/files/zenitsu-agatsuma-cosplay-demon-slayer_4_grande.jpg?v=1700752723',
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
    image: 'https://m.media-amazon.com/images/I/71XTNC3EKsL._AC_UY1000_.jpg',
    images: [
        'https://m.media-amazon.com/images/I/71XTNC3EKsL._AC_UY1000_.jpg',
        'https://images.halloweencostumes.com/products/41067/2-1/sailor-moon-costume.jpg',
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
    {
        name: 'Naruto Uzumaki',
        category: 'Anime',
        description: 'Bộ trang phục Naruto chính nghĩa với áo cam trứng, dây bandage và mặt nạ.',
        price: 150000,
        image: 'https://myjapanclothes.com/cdn/shop/files/naruto-uzumaki-cosplay_1_grande.jpg?v=1700672027'
    },
    {
        name: 'Bleach Ichigo',
        category: 'Anime',
        description: 'Trang phục Ichigo Kurosaki với kiếm Zangetsu và áo chiến đấu.',
        price: 180000,
        image: 'https://www.cospropsensei.com/cdn/shop/files/8087BC92-4AA0-4525-AB2A-48FD398F9C6E.jpg?v=1762914553&width=1946'
    },
    {
        name: 'One Piece Luffy',
        category: 'Anime',
        description: 'Bộ trang phục Luffy với áo đỏ, quần xanh và dép geta.',
        price: 160000,
        image: 'https://myjapanclothes.com/cdn/shop/files/monke-d-luffy-wano-country-cosplay-one-piece_1_grande.jpg?v=1700671997'
    },
    {
        name: 'Demon Slayer Tanjiro',
        category: 'Anime',
        description: 'Trang phục Tanjiro Kamado với kimono đen và tai quỷ đỏ.',
        price: 170000,
        image: 'https://myjapanclothes.com/cdn/shop/files/tanjiro-kamado-cosplay-demon-slayer_9_grande.jpg?v=1700672583'
    },
    {
        name: 'Elden Ring Knight',
        category: 'Game',
        description: 'Armor của Knight từ Elden Ring với kiếm và khiên.',
        price: 200000,
        image: 'https://i.redd.it/my-carian-knights-cosplay-v0-r51emmgjx98e1.jpg?width=1152&format=pjpg&auto=webp&s=8c999b11e10a34df0bd31e9853df2377af964364'
    },
    {
        name: 'Dark Souls Artorias',
        category: 'Game',
        description: 'Bộ giáp Artorias the Abysswalker với kiếm danh hiệu.',
        price: 220000,
        image: 'https://preview.redd.it/self-i-made-an-artorias-the-abysswalker-cosplay-and-v0-ljsrp8ck9h031.jpg?width=640&crop=smart&auto=webp&s=f215eaae929d828113dc384fa88524f3d4006797'
    },
    {
        name: 'Witcher Geralt',
        category: 'Game',
        description: 'Trang phục Geralt of Rivia với áo da trắng và kiếm silver.',
        price: 210000,
        image: 'https://i.ebayimg.com/thumbs/images/g/~msAAeSwVKtokv2w/s-l500.jpg'
    },
    {
        name: 'League of Legends K/DA Ahri',
        category: 'Game',
        description: 'Trang phục K/DA Ahri với tóc xanh và quần áo futuristic.',
        price: 190000,
        image: 'https://i.ebayimg.com/images/g/pFwAAOSwgkFoJ9dh/s-l1600.webp'
    },
    {
        name: 'Superman',
        category: 'Siêu Anh Hùng',
        description: 'Bộ trang phục Superman chính nghĩa với áo xanh, áo choàng đỏ.',
        price: 180000,
        image: 'https://www.purecostumes.com/cdn/shop/files/R888001_full_1.jpg?v=1766876153&width=990'
    },
    {
        name: 'Batman',
        category: 'Siêu Anh Hùng',
        description: 'Trang phục Batman với áo choàng đen, mặt nạ và nắm đấm.',
        price: 200000,
        image: 'https://spencers.scene7.com/is/image/Spencers/01565266-a?fmt=webp&hei=1200&wid=1200'
    },
    {
    name: 'Wonder Woman',
    category: 'Siêu Anh Hùng',
    description: 'Bộ trang phục Wonder Woman với áo vàng xanh và vỏ cực.',
    price: 190000,
    image: 'https://www.spotlightstores.com/medias/responsiveProduct-SPOTWF-BP80545530-multicoloured.jpg?context=bWFzdGVyfGltYWdlc3w4NzYxfGltYWdlL2pwZWd8aW1hZ2VzL2gzNi9oYjYvMjczNDY3MjY5MTIwMzAvcmVzcG9uc2l2ZVByb2R1Y3RfU1BPVFdGX0JQODA1NDU1MzAtbXVsdGljb2xvdXJlZC5qcGd8NDIwZTNjOGZjMzAxZDI4Y2E5ODMyZjlhMDMyOTFiYzlmNDUxYmYyYWRhNTkxNDJkMWI5OGQ2ZTA5ZjdjNGJkNA'
},
    {
        name: 'Iron Man Mark 50',
        category: 'Siêu Anh Hùng',
        description: 'Áo giáp Iron Man Mark 50 với tính năng LED.',
        price: 250000,
        image: 'https://i.ebayimg.com/images/g/FcAAAeSw0Ulp6xP2/s-l1600.webp'
    },
    {
        name: 'Princess Elsa',
        category: 'Fantasy',
        description: 'Trang phục Elsa với váy xanh lấp lánh và khăn lụa trắng.',
        price: 175000,
        image: 'https://www.thecostumeland.com/images/full/dg83167-elsa-frozen-prestige-woman-halloween-costumes.jpg'
    },
    {
        name: 'Fairy Elf Queen',
        category: 'Fantasy',
        description: 'Trang phục Nữ Hoàng Tiên với cánh, vương miện và áo dài lấp lánh.',
        price: 185000,
        image: 'https://i.mmo.cm/is/image/mmoimg/mw-product-zoom/dark-fairy-costume--mw-118679-1.jpg'
    },
    {
        name: 'Dragon Slayer',
        category: 'Fantasy',
        description: 'Trang phục chiến binh với giáp da, kiếm lớn và áo khoác lông.',
        price: 210000,
        image: 'https://m.media-amazon.com/images/I/71xzZRS7ydL._AC_SX569_.jpg'
    },
    {
        name: 'Ninja Shinobi',
        category: 'Nhật Bản',
        description: 'Bộ trang phục Ninja với áo đen, dây band mặt và katana.',
        price: 160000,
        image: 'https://m.media-amazon.com/images/I/5106pO9TTUL._AC_SX569_.jpg'
    },
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