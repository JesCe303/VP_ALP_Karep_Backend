import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("✨ Memulai proses seeding data...");

  // Seeder untuk CompanyTag
    console.log('📌 Membuat Company Tags...');
  const companyTags = await Promise.all([
    prisma.companyTag.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, name: 'Technology' }
    }),
    prisma.companyTag.upsert({
      where: { id: 2 },
      update: {},
      create: { id: 2, name: 'Finance' }
    }),
    prisma.companyTag.upsert({
      where: { id: 3 },
      update: {},
      create: { id: 3, name: 'Healthcare' }
    }),
    prisma.companyTag.upsert({
      where: { id: 4 },
      update: {},
      create: { id: 4, name: 'Education' }
    }),
    prisma.companyTag.upsert({
      where: { id: 5 },
      update: {},
      create: { id: 5, name: 'E-commerce' }
    }),
    prisma.companyTag.upsert({
      where: { id: 6 },
      update: {},
      create: { id: 6, name: 'Manufacturing' }
    }),
    prisma.companyTag.upsert({
      where: { id: 7 },
      update: {},
      create: { id: 7, name: 'Startup' }
    }),
    prisma.companyTag.upsert({
      where: { id: 8 },
      update: {},
      create: { id: 8, name: 'Enterprise' }
    })
  ]);
  console.log(`✅ ${companyTags.length} Company Tags dibuat`);

  // Seeder untuk JobTag
  console.log('📌 Membuat Job Tags...');
  const jobTags = await Promise.all([
    prisma.jobTag.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1, name: 'Full-Time' }
    }),
    prisma.jobTag.upsert({
      where: { id: 2 },
      update: {},
      create: { id: 2, name: 'Part-Time' }
    }),
    prisma.jobTag.upsert({
      where: { id: 3 },
      update: {},
      create: { id: 3, name: 'Remote' }
    }),
    prisma.jobTag.upsert({
      where: { id: 4 },
      update: {},
      create: { id: 4, name: 'On-Site' }
    }),
    prisma.jobTag.upsert({
      where: { id: 5 },
      update: {},
      create: { id: 5, name: 'Hybrid' }
    }),
    prisma.jobTag.upsert({
      where: { id: 6 },
      update: {},
      create: { id: 6, name: 'Entry Level' }
    }),
    prisma.jobTag.upsert({
      where: { id: 7 },
      update: {},
      create: { id: 7, name: 'Mid Level' }
    }),
    prisma.jobTag.upsert({
      where: { id: 8 },
      update: {},
      create: { id: 8, name: 'Senior Level' }
    }),
    prisma.jobTag.upsert({
      where: { id: 9 },
      update: {},
      create: { id: 9, name: 'Internship' }
    }),
    prisma.jobTag.upsert({
      where: { id: 10 },
      update: {},
      create: { id: 10, name: 'Contract' }
    })
  ]);
  console.log(`✅ ${jobTags.length} Job Tags dibuat`);

  // Seeder untuk Notification (untuk user id 1)
  console.log('📌 Membuat Notifications untuk User ID 1...');
  const notifications = await Promise.all([
    prisma.notification.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        title: 'Welcome to Karep!',
        subtitle: 'Selamat datang di platform pencarian kerja Karep. Mulai perjalanan karirmu sekarang!',
        user_id: 1
      }
    }),
    prisma.notification.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        title: 'Profile Update',
        subtitle: 'Lengkapi profilmu untuk meningkatkan peluang diterima kerja.',
        user_id: 1
      }
    }),
    prisma.notification.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        title: 'New Job Recommendations',
        subtitle: 'Ada 5 lowongan kerja baru yang sesuai dengan profilmu!',
        user_id: 1
      }
    })
  ]);
  console.log(`✅ ${notifications.length} Notifications dibuat`);

  // Seeder untuk Experience (untuk user id 1)
  console.log('📌 Membuat Experiences untuk User ID 1...');
  const experiences = await Promise.all([
    prisma.experience.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        title: 'Software Engineer at Tech Corp',
        description: 'Mengembangkan aplikasi web menggunakan React dan Node.js. Berkolaborasi dengan tim untuk merancang dan mengimplementasikan fitur-fitur baru.',
        user_id: 1
      }
    }),
    prisma.experience.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        title: 'Frontend Developer at Startup Inc',
        description: 'Bertanggung jawab atas pengembangan UI/UX aplikasi mobile dan web. Menggunakan React Native dan TypeScript.',
        user_id: 1
      }
    }),
    prisma.experience.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        title: 'Freelance Web Developer',
        description: 'Membangun website dan aplikasi web untuk berbagai klien. Spesialisasi dalam full-stack development.',
        user_id: 1
      }
    })
  ]);
  console.log(`✅ ${experiences.length} Experiences dibuat`);

  // Seeder untuk Achievement (untuk user id 1)
  console.log('📌 Membuat Achievements untuk User ID 1...');
  const achievements = await Promise.all([
    prisma.achievement.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        title: 'Best Employee 2024',
        description: 'Mendapat penghargaan sebagai karyawan terbaik tahun 2024 di Tech Corp.',
        user_id: 1
      }
    }),
    prisma.achievement.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        title: 'AWS Certified Developer',
        description: 'Lulus sertifikasi AWS Certified Developer - Associate dengan nilai tinggi.',
        user_id: 1
      }
    }),
    prisma.achievement.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        title: 'Hackathon Winner 2023',
        description: 'Juara 1 pada Jakarta Tech Hackathon 2023 dengan project AI-powered job matching platform.',
        user_id: 1
      }
    }),
    prisma.achievement.upsert({
      where: { id: 4 },
      update: {},
      create: {
        id: 4,
        title: 'Google Cloud Professional',
        description: 'Mendapat sertifikasi Google Cloud Professional Cloud Architect.',
        user_id: 1
      }
    })
  ]);
  console.log(`✅ ${achievements.length} Achievements dibuat`);

  // Seeder untuk Company (untuk user id 1)
  console.log('📌 Membuat Company untuk User ID 1...');
  const company = await prisma.company.upsert({
    where: { user_id: 1 },
    update: {},
    create: {
      id: 1,
      email: 'contact@techvision.com',
      name: 'TechVision Indonesia',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta',
      phone_number: '+62-21-12345678',
      website: 'https://www.techvision.com',
      vision_mission: 'Menjadi perusahaan teknologi terdepan di Indonesia yang menghadirkan solusi inovatif untuk berbagai industri.',
      description: 'TechVision Indonesia adalah perusahaan teknologi yang fokus pada pengembangan software dan digital transformation. Kami membantu perusahaan-perusahaan besar untuk bertransformasi digital.',
      founding_date: new Date('2015-01-15'),
      logo_path: '/uploads/companies/techvision-logo.png',
      image_path: '/uploads/companies/techvision-cover.jpg',
      user_id: 1
    }
  });
  console.log(`✅ Company "${company.name}" dibuat`);

  // Seeder untuk CompanyToTags (relasi company dengan tags)
  console.log('📌 Membuat Company to Tags relations...');
  const companyToTags = await Promise.all([
    prisma.companyToTags.upsert({
      where: {
        company_id_company_tag_id: {
          company_id: 1,
          company_tag_id: 1 // Technology
        }
      },
      update: {},
      create: {
        company_id: 1,
        company_tag_id: 1
      }
    }),
    prisma.companyToTags.upsert({
      where: {
        company_id_company_tag_id: {
          company_id: 1,
          company_tag_id: 7 // Startup
        }
      },
      update: {},
      create: {
        company_id: 1,
        company_tag_id: 7
      }
    }),
    prisma.companyToTags.upsert({
      where: {
        company_id_company_tag_id: {
          company_id: 1,
          company_tag_id: 8 // Enterprise
        }
      },
      update: {},
      create: {
        company_id: 1,
        company_tag_id: 8
      }
    })
  ]);
  console.log(`✅ ${companyToTags.length} Company-Tag relations dibuat`);

  // Seeder untuk Job
  console.log('📌 Membuat Jobs...');
  const jobs = await Promise.all([
    prisma.job.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: 'Senior Full Stack Developer',
        description: `Kami mencari Senior Full Stack Developer yang berpengalaman untuk bergabung dengan tim kami.

Tanggung Jawab:
- Mengembangkan aplikasi web full-stack menggunakan React dan Node.js
- Merancang dan mengimplementasikan RESTful APIs
- Berkolaborasi dengan tim design dan product
- Melakukan code review dan mentoring junior developers
- Mengoptimalkan performa aplikasi

Kualifikasi:
- Minimal 5 tahun pengalaman sebagai Full Stack Developer
- Expert dalam React, Node.js, TypeScript
- Pengalaman dengan database PostgreSQL dan MongoDB
- Familiar dengan Docker dan CI/CD
- Kemampuan problem solving yang baik`,
        company_id: 1
      }
    }),
    prisma.job.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        name: 'Frontend Developer',
        description: `Bergabunglah dengan tim kami sebagai Frontend Developer!

Tanggung Jawab:
- Mengembangkan interface aplikasi web yang responsive
- Implementasi design dari tim UI/UX
- Optimasi performa frontend
- Kolaborasi dengan backend team

Kualifikasi:
- Minimal 2 tahun pengalaman Frontend Development
- Mahir React.js, HTML5, CSS3, JavaScript
- Pengalaman dengan state management (Redux/Context API)
- Familiar dengan Git dan Agile methodology`,
        company_id: 1
      }
    }),
    prisma.job.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        name: 'Backend Developer',
        description: `Kami membutuhkan Backend Developer yang solid untuk mengembangkan sistem backend kami.

Tanggung Jawab:
- Mengembangkan dan maintain RESTful APIs
- Design database schema dan optimasi query
- Implementasi security best practices
- Integration dengan third-party services

Kualifikasi:
- Minimal 3 tahun pengalaman Backend Development
- Expert Node.js dan Express.js
- Strong understanding SQL dan NoSQL databases
- Pengalaman dengan microservices architecture`,
        company_id: 1
      }
    }),
    prisma.job.upsert({
      where: { id: 4 },
      update: {},
      create: {
        id: 4,
        name: 'DevOps Engineer',
        description: `Posisi DevOps Engineer untuk membangun dan maintain infrastructure kami.

Tanggung Jawab:
- Setup dan maintain CI/CD pipelines
- Manage cloud infrastructure (AWS/GCP)
- Monitoring dan troubleshooting production issues
- Implementasi automation tools

Kualifikasi:
- Minimal 3 tahun pengalaman DevOps
- Expert Docker, Kubernetes
- Pengalaman dengan AWS atau GCP
- Strong scripting skills (Bash, Python)`,
        company_id: 1
      }
    }),
    prisma.job.upsert({
      where: { id: 5 },
      update: {},
      create: {
        id: 5,
        name: 'UI/UX Designer',
        description: `Kesempatan untuk UI/UX Designer berbakat!

Tanggung Jawab:
- Merancang user interface yang menarik dan intuitif
- Melakukan user research dan testing
- Membuat wireframes dan prototypes
- Kolaborasi dengan development team

Kualifikasi:
- Minimal 2 tahun pengalaman UI/UX Design
- Mahir Figma, Adobe XD
- Portfolio yang strong
- Pemahaman design thinking dan user-centered design`,
        company_id: 1
      }
    }),
    prisma.job.upsert({
      where: { id: 6 },
      update: {},
      create: {
        id: 6,
        name: 'Mobile Developer (React Native)',
        description: `Bergabung sebagai Mobile Developer dengan fokus React Native!

Tanggung Jawab:
- Develop aplikasi mobile cross-platform
- Implement responsive design
- Integrate dengan backend APIs
- App store deployment dan maintenance

Kualifikasi:
- Minimal 2 tahun pengalaman Mobile Development
- Expert React Native
- Pengalaman publish apps di App Store dan Play Store
- Understanding native modules (iOS/Android)`,
        company_id: 1
      }
    })
  ]);
  console.log(`✅ ${jobs.length} Jobs dibuat`);

  // Seeder untuk JobToTag (relasi job dengan tags)
  console.log('📌 Membuat Job to Tag relations...');
  const jobToTags = await Promise.all([
    // Senior Full Stack Developer tags
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 1, tag_id: 1 } }, // Full-Time
      update: {},
      create: { job_id: 1, tag_id: 1 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 1, tag_id: 5 } }, // Hybrid
      update: {},
      create: { job_id: 1, tag_id: 5 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 1, tag_id: 8 } }, // Senior Level
      update: {},
      create: { job_id: 1, tag_id: 8 }
    }),

    // Frontend Developer tags
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 2, tag_id: 1 } }, // Full-Time
      update: {},
      create: { job_id: 2, tag_id: 1 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 2, tag_id: 3 } }, // Remote
      update: {},
      create: { job_id: 2, tag_id: 3 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 2, tag_id: 7 } }, // Mid Level
      update: {},
      create: { job_id: 2, tag_id: 7 }
    }),

    // Backend Developer tags
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 3, tag_id: 1 } }, // Full-Time
      update: {},
      create: { job_id: 3, tag_id: 1 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 3, tag_id: 5 } }, // Hybrid
      update: {},
      create: { job_id: 3, tag_id: 5 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 3, tag_id: 7 } }, // Mid Level
      update: {},
      create: { job_id: 3, tag_id: 7 }
    }),

    // DevOps Engineer tags
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 4, tag_id: 1 } }, // Full-Time
      update: {},
      create: { job_id: 4, tag_id: 1 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 4, tag_id: 3 } }, // Remote
      update: {},
      create: { job_id: 4, tag_id: 3 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 4, tag_id: 7 } }, // Mid Level
      update: {},
      create: { job_id: 4, tag_id: 7 }
    }),

    // UI/UX Designer tags
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 5, tag_id: 1 } }, // Full-Time
      update: {},
      create: { job_id: 5, tag_id: 1 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 5, tag_id: 5 } }, // Hybrid
      update: {},
      create: { job_id: 5, tag_id: 5 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 5, tag_id: 7 } }, // Mid Level
      update: {},
      create: { job_id: 5, tag_id: 7 }
    }),

    // Mobile Developer tags
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 6, tag_id: 1 } }, // Full-Time
      update: {},
      create: { job_id: 6, tag_id: 1 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 6, tag_id: 3 } }, // Remote
      update: {},
      create: { job_id: 6, tag_id: 3 }
    }),
    prisma.jobToTag.upsert({
      where: { job_id_tag_id: { job_id: 6, tag_id: 7 } }, // Mid Level
      update: {},
      create: { job_id: 6, tag_id: 7 }
    })
  ]);
  console.log(`✅ ${jobToTags.length} Job-Tag relations dibuat`);

  // Seeder untuk Application (user id 1 melamar ke beberapa job)
  console.log('📌 Membuat Applications untuk User ID 1...');
  const applications = await Promise.all([
    prisma.application.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        status: 'pending',
        user_id: 1,
        job_id: 2 // Frontend Developer
      }
    }),
    prisma.application.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        status: 'accepted',
        user_id: 1,
        job_id: 3 // Backend Developer
      }
    }),
    prisma.application.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        status: 'rejected',
        user_id: 1,
        job_id: 1 // Senior Full Stack Developer
      }
    })
  ]);
  console.log(`✅ ${applications.length} Applications dibuat`);

  console.log('✨ Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
