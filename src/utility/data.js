export const kriteria = [
    { id: 1, kriteria: 'Pengetahuan dan Penguasaan Teknik', kategori: 'Benefit', bobot: '0.30', tipe:'Kuantitatif' },
    { id: 2, kriteria: 'Penampilan / Definisi Otot', kategori: 'Benefit', bobot: '0.20', tipe:'Kualitatif' },
    { id: 3, kriteria: 'Etika dan Komunikasi', kategori: 'Benefit', bobot: '0.20', tipe:'Kualitatif' },
    { id: 4, kriteria: 'Pengalaman Profesi', kategori: 'Benefit', bobot: '0.15', tipe:'Kuantitatif' },
    { id: 5, kriteria: 'Sertifikasi Pelatihan / Prestasi', kategori: 'Benefit', bobot: '0.05', tipe:'Kuantitatif' },
    { id: 6, kriteria: 'Flesibilitas Jadwal Latihan', kategori: 'Benefit', bobot: '0.05', tipe:'Kualitatif' },
    { id: 7, kriteria: 'Usia', kategori: 'Cost', bobot: '0.05', tipe:'Kuantitatif' },
];

export const subkriteria = [
    {id: 1, kriteria_id: 6, subkriteria: 'Sangat Baik', bobot: 5},
    {id: 2, kriteria_id: 3, subkriteria: 'Baik', bobot: 4},
    {id: 3, kriteria_id: 2, subkriteria: 'Cukup', bobot: 3},
    {id: 4, kriteria_id: 2, subkriteria: 'Kurang', bobot: 2},
    {id: 5, kriteria_id: 6, subkriteria: 'Sangat Kurang', bobot: 1},
]

export const alternatif = [
    { id: 1, nama: 'Rizky', kelamin: 'Laki Laki', alamat: 'jl. ringroad', usia:'27' },
    { id: 2, nama: 'Dedek', kelamin: 'Laki Laki', alamat: 'jl. ringroad', usia:'27' },
    { id: 3, nama: 'Fikri', kelamin: 'Laki Laki', alamat: 'jl. ringroad', usia:'27' },
    { id: 4, nama: 'Rizal', kelamin: 'Laki Laki', alamat: 'jl. ringroad', usia:'27' },
];