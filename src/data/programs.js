'use strict';

// Camp programs. Each text field is { en, vi }.
module.exports = [
  {
    slug: 'summer-camp-cultivating-great-minds',
    season: 'summer',
    name: { en: 'Cultivating Great Minds', vi: 'Gieo Mầm Trí Lớn' },
    theme: { en: 'Summer Camp · Gratitude & Growth', vi: 'Trại hè · Biết ơn & Trưởng thành' },
    tagline: {
      en: 'A journey to discover yourself and the world around you.',
      vi: 'Hành trình khám phá bản thân và thế giới xung quanh.',
    },
    cover: 'summer-outdoor-2',
    hero: 'summer-outdoor-1',
    facts: [
      { icon: 'map-pin', label: { en: 'Location', vi: 'Địa điểm' }, value: { en: 'Nature Resort, Hoi An', vi: 'Nature Resort, Hội An' } },
      { icon: 'clock', label: { en: 'Duration', vi: 'Thời gian' }, value: { en: '7 days 6 nights', vi: '7 ngày 6 đêm' } },
      { icon: 'calendar', label: { en: 'Season', vi: 'Khởi hành' }, value: { en: 'June – July', vi: 'Tháng 6 – 7' } },
      { icon: 'users', label: { en: 'Age', vi: 'Độ tuổi' }, value: { en: '7 – 15 years old', vi: '7 – 15 tuổi' } },
    ],
    summary: {
      en: 'A 100% English‑speaking camp with native teachers and international student mentors. Campers learn naturally through real activities, group projects and daily conversation, explore the culture of Hoi An – Da Nang, and build physical and emotional balance through sports, yoga and mindfulness.',
      vi: 'Trại hè trong môi trường 100% tiếng Anh cùng giáo viên bản ngữ và mentor sinh viên quốc tế. Trại viên học tự nhiên qua hoạt động thực tế, dự án nhóm và giao tiếp hằng ngày, khám phá văn hóa Hội An – Đà Nẵng, đồng thời rèn luyện cân bằng thể chất và tinh thần qua thể thao, yoga và thiền.',
    },
    intro: {
      en: '“The purpose of education is to replace an empty mind with an open one.” — Malcolm Forbes. This summer we don’t only bring children valuable knowledge and skills; we spark a passion for learning and awaken the potential within. Cultivating Great Minds is a special adventure where campers freely explore the wide world — and themselves.',
      vi: '“Mục đích của giáo dục là biến tấm gương trống thành một tâm hồn rộng mở” — Malcolm Forbes. Mùa hè này, chúng tôi không chỉ mang đến cho các con kiến thức và kỹ năng quý báu, mà còn khơi dậy ngọn lửa đam mê học hỏi, đánh thức tiềm năng ẩn sâu bên trong. “Gieo mầm trí lớn” là chuyến phiêu lưu đặc biệt, nơi các con tự do khám phá thế giới rộng lớn và chính bản thân mình.',
    },
    highlights: [
      {
        icon: 'message-circle',
        title: { en: 'Natural English with native teachers & international mentors', vi: 'Học tiếng Anh tự nhiên cùng giáo viên bản ngữ & mentor quốc tế' },
        text: {
          en: 'Daily interaction with native teachers and international student mentors. Use English confidently in every situation — from daily conversation to presentations and debates.',
          vi: 'Tương tác hằng ngày với giáo viên bản ngữ và mentor sinh viên quốc tế. Tự tin dùng tiếng Anh trong mọi tình huống, từ giao tiếp đến thuyết trình, tranh luận.',
        },
      },
      {
        icon: 'compass',
        title: { en: 'Real‑world experiences', vi: 'Trải nghiệm thực tế – học từ thế giới xung quanh' },
        text: {
          en: 'Outdoor activities exploring the culture, nature and people of Da Nang and Hoi An — including the Da Nang International Fireworks Festival — plus a meaningful community project.',
          vi: 'Hoạt động ngoài trời khám phá văn hóa, thiên nhiên, con người Đà Nẵng – Hội An, đặc biệt là Lễ hội Pháo hoa Quốc tế Đà Nẵng, cùng dự án cộng đồng ý nghĩa.',
        },
      },
      {
        icon: 'activity',
        title: { en: 'Body & mind balance', vi: 'Cân bằng thể chất & tinh thần' },
        text: {
          en: 'Daily sports and outdoor games build stamina and teamwork; yoga, meditation and emotional exercises help children listen to themselves and stay positive.',
          vi: 'Vận động mỗi ngày với thể thao, trò chơi ngoài trời; thiền, yoga và bài tập cảm xúc giúp con lắng nghe bản thân, tăng tập trung và sống tích cực.',
        },
      },
      {
        icon: 'sprout',
        title: { en: 'Gratitude is growth', vi: '“Biết ơn cũng là sự trưởng thành”' },
        text: {
          en: 'Children learn to appreciate what they have, care for others, work in teams and develop leadership and critical thinking.',
          vi: 'Dạy trẻ trân trọng những gì mình có, quan tâm người khác, làm việc nhóm, phát triển kỹ năng lãnh đạo và tư duy phản biện.',
        },
      },
    ],
    included: [
      { en: 'Daily English classes with native teachers', vi: 'Học tiếng Anh hằng ngày với giáo viên bản ngữ' },
      { en: 'Soft skills: project‑based learning, teamwork, presentation, debate', vi: 'Kỹ năng mềm: học theo dự án, làm việc nhóm, thuyết trình, tranh luận' },
      { en: 'VinWonders adventure & Hoi An Ancient Town', vi: 'Hành trình kỳ thú tại VinWonders & Phố cổ Hội An' },
      { en: 'Kayaking on the Co Co River & pottery village', vi: 'Chèo kayak trên sông Cổ Cò & làng gốm' },
      { en: 'Da Nang International Fireworks Festival', vi: 'Lễ hội Pháo hoa Quốc tế Đà Nẵng' },
      { en: 'Beach BBQ party at sunset', vi: 'Tiệc BBQ ngắm hoàng hôn trên biển' },
    ],
    itinerary: [
      { day: 1, title: { en: 'Opening the Heart', vi: 'Trái tim yêu thương' }, items: { en: ['Welcome & free exploration', 'Ice‑breaker & team‑bonding challenges'], vi: ['Đón tiếp & khám phá tự do', 'Thử thách phá băng và gắn kết nhóm'] }, skill: { en: 'Adaptation, confident communication', vi: 'Thích nghi, tự tin giao tiếp' } },
      { day: 2, title: { en: 'Adventure & Discovery', vi: 'Khám phá thế giới' }, items: { en: ['Rise & shine: morning yoga', 'Welcome & orientation', 'VinWonders exploration – teamwork building', 'Sharing circle'], vi: ['Yoga và vận động buổi sáng', 'Chào mừng & định hướng', 'Khám phá VinWonders – xây dựng kỹ năng làm việc nhóm', 'Vòng tròn chia sẻ'] }, skill: { en: 'Cooperation, problem solving, trust', vi: 'Hợp tác, giải quyết vấn đề, xây dựng lòng tin' } },
      { day: 3, title: { en: 'The Power of Giving', vi: 'Cho đi để nhận lại' }, items: { en: ['English class: energy & sugar', 'Baking challenge – spreading joy', 'Fitness with fun', 'Hoi An by night'], vi: ['Lớp tiếng Anh: hiểu về năng lượng và đường', 'Thử thách làm bánh và lan tỏa niềm vui', 'Thể dục với niềm vui', 'Khám phá Hội An về đêm'] }, skill: { en: 'Healthy nutrition, sharing with others', vi: 'Dinh dưỡng lành mạnh, sẻ chia với người khác' } },
      { day: 4, title: { en: 'Strong Body, Strong Mind', vi: 'Khỏe mạnh mỗi ngày' }, items: { en: ['English class: move to grow', 'River kayaking', 'Fitness with fun', 'Sunset BBQ on the beach'], vi: ['Lớp tiếng Anh: vận động để cao lớn hơn', 'Chèo thuyền kayak trên sông', 'Thể dục với niềm vui', 'Tiệc BBQ ngắm hoàng hôn trên biển'] }, skill: { en: 'Fitness, endurance, embracing challenges', vi: 'Nâng cao thể lực, rèn sức bền, dám đón nhận thử thách' } },
      { day: 5, title: { en: 'The Journey Within', vi: 'Hiểu bạn hiểu mình' }, items: { en: ['English class: art therapy for emotional health', 'Magic clay: creative art & meditation', 'Summer beach festival', 'Sharing circle'], vi: ['Lớp tiếng Anh: liệu pháp nghệ thuật', 'Đất sét kỳ diệu: nghệ thuật sáng tạo & thiền', 'Lễ hội biển mùa hè', 'Vòng tròn chia sẻ'] }, skill: { en: 'Emotional intelligence through art', vi: 'Phát triển trí tuệ cảm xúc qua nghệ thuật' } },
      { day: 6, title: { en: 'Gratitude in Action', vi: 'Lời cảm ơn đẹp nhất' }, items: { en: ['Basket‑boat journey through the coconut forest', 'Gratitude moment: looking back on the journey', 'International fireworks night'], vi: ['Khám phá rừng dừa bằng thuyền thúng', 'Khoảnh khắc tri ân: nhìn lại hành trình', 'Đại tiệc pháo hoa quốc tế'] }, skill: { en: 'Public speaking, gratitude', vi: 'Tự tin trước đám đông, biết ơn cuộc sống' } },
      { day: 7, title: { en: 'The Power of New Beginnings', vi: 'Sức mạnh của sự khởi đầu mới' }, items: { en: ['Departure'], vi: ['Khởi hành'] }, skill: { en: 'Setting long‑term goals', vi: 'Định hướng mục tiêu dài hạn' } },
    ],
    schedule: [
      ['06:00', { en: 'Wake up', vi: 'Thức dậy' }],
      ['06:30', { en: 'Morning movement', vi: 'Vận động' }],
      ['07:30', { en: 'Breakfast', vi: 'Ăn sáng' }],
      ['08:30', { en: 'Learning sessions', vi: 'Học tập' }],
      ['11:30', { en: 'Lunch & rest', vi: 'Ăn trưa & nghỉ' }],
      ['13:30', { en: 'Field trips & experiences', vi: 'Trải nghiệm thực tế & tham quan' }],
      ['16:00', { en: 'Sports', vi: 'Thể dục' }],
      ['17:30', { en: 'Free time', vi: 'Thời gian tự do' }],
      ['19:00', { en: 'Dinner', vi: 'Ăn tối' }],
      ['20:00', { en: 'Wellbeing activity', vi: 'Hoạt động sức khỏe tinh thần' }],
      ['21:00', { en: 'Call home', vi: 'Gọi điện cho gia đình' }],
      ['22:00', { en: 'Lights out', vi: 'Đi ngủ' }],
    ],
    venues: [
      {
        name: { en: 'Accommodation · Nature Resort Hoi An', vi: 'Nơi ở · Nature Resort Hội An' },
        images: ['nature-resort-pool', 'nature-resort-pool-aerial', 'nature-resort-room', 'nature-resort-garden', 'nature-resort-drinks', 'nature-resort-pool-top'],
      },
    ],
    gallery: ['summer-outdoor-1', 'summer-craft-2', 'summer-lantern', 'camp-kids-1', 'camp-kids-2', 'camp-jungle'],
  },
  {
    slug: 'winter-camp-global-changemakers',
    season: 'winter',
    name: { en: 'Global Changemakers', vi: 'Global Changemakers' },
    theme: { en: 'Winter Camp · Hoi An – Da Nang', vi: 'Trại đông · Hội An – Đà Nẵng' },
    tagline: {
      en: 'Culture, global innovation and hands‑on learning in a UNESCO World Heritage town.',
      vi: 'Văn hóa, đổi mới toàn cầu và học tập thực hành tại Di sản Thế giới UNESCO.',
    },
    cover: 'golden-bridge',
    hero: 'hd/a31',
    facts: [
      { icon: 'map-pin', label: { en: 'Location', vi: 'Địa điểm' }, value: { en: 'Hoi An – Da Nang', vi: 'Hội An – Đà Nẵng' } },
      { icon: 'clock', label: { en: 'Duration', vi: 'Thời gian' }, value: { en: '2 weeks', vi: '2 tuần' } },
      { icon: 'calendar', label: { en: 'Season', vi: 'Khởi hành' }, value: { en: 'Late December – early January', vi: 'Cuối tháng 12 – đầu tháng 1' } },
      { icon: 'users', label: { en: 'Age', vi: 'Độ tuổi' }, value: { en: '7 – 17 years old', vi: '7 – 17 tuổi' } },
    ],
    summary: {
      en: 'An experiential program combining cultural discovery, global innovation and hands‑on learning: outdoor adventures, team projects on global challenges, visits to cultural and environmental sites, real‑world community projects and career‑discovery modules focused on global citizenship.',
      vi: 'Chương trình trải nghiệm kết hợp khám phá văn hóa, đổi mới toàn cầu và học tập thực hành: phiêu lưu ngoài trời, dự án nhóm về các thách thức toàn cầu, tham quan địa điểm văn hóa – môi trường, dự án cộng đồng thực tế và mô‑đun khám phá nghề nghiệp hướng tới công dân toàn cầu.',
    },
    intro: {
      en: 'Global Changemakers lets campers discover how these dynamic cities tackle important global challenges while preserving their rich cultural heritage. Drawing on Hoi An’s status as a UNESCO World Heritage Site and Da Nang’s role as a growing hub for sustainable tourism and innovation, campers see first‑hand how both cities balance tradition, modernization and sustainability.',
      vi: 'Trại đông Global Changemakers giúp trại viên khám phá cách những thành phố năng động này giải quyết các thách thức toàn cầu trong khi vẫn bảo tồn di sản văn hóa phong phú. Tận dụng vị thế Di sản Thế giới UNESCO của Hội An và vai trò trung tâm du lịch bền vững, đổi mới của Đà Nẵng, trại viên được tiếp xúc trực tiếp với cách hai thành phố cân bằng giữa truyền thống, hiện đại hóa và tính bền vững.',
    },
    highlights: [
      {
        icon: 'globe',
        title: { en: 'Culture meets global themes', vi: 'Kết hợp văn hóa với các chủ đề toàn cầu' },
        text: {
          en: 'Sustainability, innovation, technology, global connection, leadership and change — encouraging students to become global citizens.',
          vi: 'Tính bền vững, đổi mới, công nghệ, kết nối toàn cầu, lãnh đạo và thay đổi — khuyến khích học sinh trở thành công dân toàn cầu.',
        },
      },
      {
        icon: 'lightbulb',
        title: { en: 'Learning by doing', vi: 'Học thông qua trải nghiệm' },
        text: {
          en: 'Afternoon hands‑on activities link directly to morning lessons, building critical thinking, independence and problem‑solving.',
          vi: 'Hoạt động thực tiễn buổi chiều gắn liền với bài học buổi sáng, phát triển tư duy phản biện, tính độc lập và giải quyết vấn đề.',
        },
      },
      {
        icon: 'pie-chart',
        title: { en: 'Balanced structure', vi: 'Cấu trúc hài hòa' },
        text: {
          en: '40% academics · 40% experiential activities · 20% physical training for a well‑rounded, transformative experience.',
          vi: '40% học thuật · 40% hoạt động trải nghiệm · 20% rèn luyện thể chất cho trải nghiệm học tập toàn diện.',
        },
      },
      {
        icon: 'building',
        title: { en: 'Premium facilities', vi: 'Cơ sở vật chất cao cấp' },
        text: {
          en: 'Stay at the 4‑star Mood Hoi An Riverside Resort & Spa; learn at Skyline Hill International School Hoi An.',
          vi: 'Lưu trú tại Mood Hoian Riverside Resort & Spa 4 sao; học tập tại Trường Quốc tế Skyline Hill Hội An.',
        },
      },
      {
        icon: 'graduation-cap',
        title: { en: '100% native‑speaking teachers', vi: 'Giảng viên 100% bản ngữ' },
        text: {
          en: 'Experienced teachers with many years teaching children in Asia, in a truly international environment.',
          vi: 'Đội ngũ giảng viên bản ngữ nhiều năm kinh nghiệm giảng dạy trẻ em tại châu Á, trong môi trường quốc tế.',
        },
      },
      {
        icon: 'award',
        title: { en: 'Certificate of completion', vi: 'Chứng chỉ hoàn thành' },
        text: {
          en: 'Every camper receives a certificate — a great addition to future study‑abroad applications.',
          vi: 'Học viên được cấp chứng chỉ sau khóa học, hỗ trợ làm đẹp hồ sơ du học sau này.',
        },
      },
    ],
    included: [
      { en: '4 English lessons every morning', vi: '4 tiết tiếng Anh mỗi buổi sáng' },
      { en: 'Leadership, technology & innovation workshops', vi: 'Hội thảo lãnh đạo, công nghệ & đổi mới' },
      { en: 'Cycling tour, factory visit, local biodiversity trip', vi: 'Tour đạp xe, tham quan nhà máy, khám phá đa dạng sinh học' },
      { en: 'Beach clean‑up & Da Nang business incubator visit', vi: 'Dọn dẹp bãi biển & thăm Vườn ươm doanh nghiệp Đà Nẵng' },
      { en: 'Christmas night, New Year party & Global Talent Show', vi: 'Đêm Giáng sinh, tiệc Năm mới & Global Talent Show' },
      { en: 'VinWonders and Hoi An Ancient Town by night', vi: 'VinWonders và Phố cổ Hội An về đêm' },
    ],
    itinerary: [
      { day: { en: 'Week 1', vi: 'Tuần 1' }, title: { en: 'Global mindset & innovation', vi: 'Tư duy toàn cầu & đổi mới' }, items: { en: ['Arrival at Da Nang airport · ice‑breaker games', 'Global leadership skills · leadership challenge · Hoi An by night', 'Digital future & technology workshop · Christmas night', 'World cuisine discovery · cycling tour · movie night', 'Global supply chains · factory visit · product design challenge', 'Biodiversity protection · local biodiversity tour · quiz night', 'VinWonders'], vi: ['Đến sân bay Đà Nẵng · trò chơi phá băng', 'Kỹ năng lãnh đạo toàn cầu · thử thách lãnh đạo · Hội An về đêm', 'Tương lai số & hội thảo công nghệ · Đêm hội Giáng sinh', 'Khám phá ẩm thực toàn cầu · tour đạp xe · Movie night', 'Chuỗi cung ứng toàn cầu · tham quan nhà máy · thử thách thiết kế sản phẩm', 'Bảo vệ đa dạng sinh học · tham quan đa dạng sinh học địa phương · đêm đố chữ', 'VinWonders'] }, skill: { en: 'Leadership, technology, global awareness', vi: 'Lãnh đạo, công nghệ, nhận thức toàn cầu' } },
      { day: { en: 'Week 2', vi: 'Tuần 2' }, title: { en: 'Changemakers in action', vi: 'Hành động vì sự thay đổi' }, items: { en: ['Sports festival', 'Global environmental challenges · beach clean‑up & recycling · eco‑innovation challenge', 'Leadership across cultures · Da Nang business incubator · New Year party', 'Cultural dance & music · cultural experience · Global Talent Show', 'Global languages & communication · language exchange · language games', 'Cultural diplomacy · cultural exchange workshop · farewell party', 'Farewell & see you again'], vi: ['Lễ hội thể thao', 'Thách thức môi trường toàn cầu · dọn dẹp bãi biển & tái chế · thử thách đổi mới sinh thái', 'Lãnh đạo xuyên văn hóa · Vườn ươm doanh nghiệp Đà Nẵng · tiệc chào Năm mới', 'Vũ điệu & âm nhạc văn hóa · trải nghiệm văn hóa · Global Talent Show', 'Ngôn ngữ & giao tiếp toàn cầu · trao đổi ngôn ngữ · trò chơi ngôn ngữ', 'Ngoại giao văn hóa · hội thảo giao lưu văn hóa · tiệc chia tay', 'Chia tay và hẹn gặp lại'] }, skill: { en: 'Sustainability, communication, cultural exchange', vi: 'Bền vững, giao tiếp, giao lưu văn hóa' } },
    ],
    schedule: [
      ['08:30', { en: 'English lessons (4 × 40 min)', vi: 'Lớp tiếng Anh (4 × 40 phút)' }],
      ['11:30', { en: 'Lunch', vi: 'Ăn trưa' }],
      ['12:30', { en: 'Rest', vi: 'Nghỉ ngơi' }],
      ['13:00', { en: 'Hands‑on activities (3 hours)', vi: 'Hoạt động trải nghiệm (3 giờ)' }],
      ['16:00', { en: 'Physical class', vi: 'Lớp thể chất' }],
      ['17:00', { en: 'Rest', vi: 'Nghỉ ngơi' }],
      ['18:00', { en: 'Dinner', vi: 'Ăn tối' }],
      ['19:00', { en: 'Evening activity', vi: 'Hoạt động buổi tối' }],
      ['20:30', { en: 'Roll call', vi: 'Điểm danh cuối ngày' }],
    ],
    venues: [
      {
        name: { en: 'Learning · Skyline Hill International School Hoi An', vi: 'Học tập · Trường Quốc tế Skyline Hill Hội An' },
        images: ['skyline-school-1', 'skyline-school-3', 'skyline-library', 'skyline-school-4', 'skyline-school-2'],
      },
      {
        name: { en: 'Accommodation', vi: 'Nơi ở' },
        images: ['mood-resort-night', 'mood-resort-facade', 'mood-resort-bikes', 'mood-resort-room'],
      },
      {
        name: { en: 'Food · Vietnamese & international cuisine', vi: 'Ẩm thực · Món Việt & quốc tế' },
        images: ['food-mi-quang', 'food-banh-mi', 'food-banh-xeo', 'food-bun', 'food-spring-rolls', 'food-buffet'],
      },
    ],
    gallery: ['camp-group-banner', 'camp-blue', 'camp-bana', 'camp-orange', 'camp-group-field', 'camp-stage'],
  },
];
