// src/app/features/content-management/components/about-content/about-content.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AboutHeader,
  OurStory,
  MissionVision,
  ValueItem,
  TeamMember,
  StatItem,
  TimelineItem,
  AboutSection,
} from '../..../../../../../../core//models/content.model';

@Component({
  selector: 'app-about-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.scss'],
})
export class AboutContentComponent {
  activeSection = signal<AboutSection>('about-header');

  sections: { id: AboutSection; label: string; icon: string }[] = [
    { id: 'about-header', label: 'رأس الصفحة', icon: 'bi-layout-text-window' },
    { id: 'our-story', label: 'قصتنا', icon: 'bi-book' },
    { id: 'mission-vision', label: 'الرؤية والرسالة', icon: 'bi-bullseye' },
    { id: 'our-values', label: 'قيمنا', icon: 'bi-heart' },
    { id: 'our-team', label: 'فريقنا', icon: 'bi-people' },
    { id: 'our-stats', label: 'الإحصائيات', icon: 'bi-graph-up' },
    { id: 'timeline', label: 'مسيرتنا', icon: 'bi-clock-history' },
  ];

  // About Header
  aboutHeader = signal<AboutHeader>({
    title: 'من نحن',
    description: 'تعرف على قصتنا ورؤيتنا ومسيرتنا نحو تقديم أفضل تجربة تسوق للأزياء',
    backgroundImage: 'https://via.placeholder.com/1920x400/1d3557/ffffff?text=About+Us',
  });

  // Our Story
  ourStory = signal<OurStory>({
    title: 'قصتنا',
    description: 'رحلة بدأت بحلم وتحولت إلى واقع',
    text1:
      'بدأت قصة FashionHub في عام 2015 من فكرة بسيطة: توفير ملابس عصرية بجودة عالية وأسعار معقولة للجميع. انطلقنا من متجر صغير في الرياض، وكان حلمنا أن نصبح الوجهة الأولى لعشاق الموضة في المنطقة.',
    text2:
      'اليوم، وبعد سنوات من العمل الجاد والتفاني، أصبح FashionHub منصة رائدة للتجارة الإلكترونية في مجال الأزياء، نخدم أكثر من 500,000 عميل في جميع أنحاء المملكة العربية السعودية ودول الخليج.',
    image: 'https://via.placeholder.com/600x400/e63946/ffffff?text=Our+Story',
  });

  // Mission & Vision
  missionVision = signal<MissionVision>({
    missionTitle: 'رسالتنا',
    missionText:
      'نسعى لتمكين كل شخص من التعبير عن ذاته من خلال الأزياء، عبر توفير تشكيلة متنوعة من الملابس والإكسسوارات العصرية بجودة استثنائية وأسعار تنافسية، مع تجربة تسوق سلسة وممتعة.',
    missionIcon: 'bi-rocket-takeoff',
    visionTitle: 'رؤيتنا',
    visionText:
      'أن نكون المنصة الرائدة والأكثر ثقة في مجال الأزياء الإلكترونية في منطقة الشرق الأوسط، ونموذجاً يحتذى به في الابتكار وخدمة العملاء والمسؤولية الاجتماعية.',
    visionIcon: 'bi-eye',
  });

  // Our Values
  ourValues = signal<ValueItem[]>([
    {
      id: 1,
      icon: 'bi-gem',
      title: 'الجودة',
      description: 'نلتزم بتقديم منتجات عالية الجودة تلبي توقعات عملائنا وتتجاوزها',
    },
    {
      id: 2,
      icon: 'bi-shield-check',
      title: 'الأمانة',
      description: 'الشفافية والصدق في جميع تعاملاتنا مع العملاء والشركاء',
    },
    {
      id: 3,
      icon: 'bi-lightbulb',
      title: 'الابتكار',
      description: 'نسعى دائماً لتطوير وتحسين خدماتنا ومواكبة أحدث صيحات الموضة',
    },
    {
      id: 4,
      icon: 'bi-people',
      title: 'العميل أولاً',
      description: 'رضا العملاء هو أولويتنا القصوى ونعمل جاهدين لتقديم أفضل تجربة',
    },
    {
      id: 5,
      icon: 'bi-globe',
      title: 'الاستدامة',
      description: 'نؤمن بأهمية الحفاظ على البيئة ونسعى لتبني ممارسات مستدامة',
    },
    {
      id: 6,
      icon: 'bi-hand-thumbs-up',
      title: 'التميز',
      description: 'نطمح للتميز في كل ما نقدمه من منتجات وخدمات',
    },
  ]);

  valuesLayout = signal<'grid' | 'list'>('grid');
  showValuesIcons = signal(true);

  // Our Team
  teamMembers = signal<TeamMember[]>([
    {
      id: 1,
      name: 'أحمد محمد',
      position: 'المؤسس والرئيس التنفيذي',
      image: 'https://via.placeholder.com/200x200/1d3557/ffffff?text=CEO',
      bio: 'رائد أعمال بخبرة تزيد عن 15 عاماً في مجال التجارة الإلكترونية والأزياء',
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
      ],
    },
    {
      id: 2,
      name: 'سارة أحمد',
      position: 'مديرة التسويق',
      image: 'https://via.placeholder.com/200x200/e63946/ffffff?text=CMO',
      bio: 'خبيرة تسويق رقمي مع سجل حافل في بناء العلامات التجارية',
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
      ],
    },
    {
      id: 3,
      name: 'محمد علي',
      position: 'مدير العمليات',
      image: 'https://via.placeholder.com/200x200/4cc9f0/ffffff?text=COO',
      bio: 'متخصص في إدارة سلاسل الإمداد والخدمات اللوجستية',
      socialLinks: [{ platform: 'linkedin', url: 'https://linkedin.com' }],
    },
    {
      id: 4,
      name: 'نورة خالد',
      position: 'مديرة خدمة العملاء',
      image: 'https://via.placeholder.com/200x200/f72585/ffffff?text=CS',
      bio: 'شغوفة بتقديم تجربة عملاء استثنائية ومميزة',
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
      ],
    },
  ]);

  teamSectionTitle = signal('فريقنا');
  teamSectionDescription = signal('نخبة من المتخصصين يعملون بشغف لخدمتكم');
  showTeamSocial = signal(true);
  teamLayout = signal<'grid' | 'carousel'>('grid');

  // Statistics
  stats = signal<StatItem[]>([
    { id: 1, icon: 'bi-people', value: '500', label: 'عميل سعيد', suffix: 'ألف+' },
    { id: 2, icon: 'bi-bag', value: '50', label: 'منتج متنوع', suffix: 'ألف+' },
    { id: 3, icon: 'bi-truck', value: '1', label: 'طلب تم توصيله', suffix: 'مليون+' },
    { id: 4, icon: 'bi-star', value: '4.8', label: 'تقييم العملاء', suffix: '/5' },
  ]);

  statsSectionTitle = signal('أرقامنا تتحدث');
  statsSectionDescription = signal('إنجازات نفخر بها ونعمل على تطويرها باستمرار');
  showStatsAnimation = signal(true);
  statsBackgroundColor = signal('#1d3557');

  // Timeline
  timeline = signal<TimelineItem[]>([
    {
      id: 1,
      year: '2015',
      title: 'البداية',
      description: 'افتتاح أول متجر في الرياض بتشكيلة محدودة من الملابس الرجالية',
    },
    {
      id: 2,
      year: '2017',
      title: 'التوسع',
      description: 'إطلاق قسم الملابس النسائية وافتتاح فرعين جديدين في جدة والدمام',
    },
    {
      id: 3,
      year: '2019',
      title: 'الانطلاقة الرقمية',
      description: 'إطلاق المتجر الإلكتروني وتطبيق الجوال لتوفير تجربة تسوق أسهل',
    },
    {
      id: 4,
      year: '2021',
      title: 'التوسع الإقليمي',
      description: 'بدء الشحن لجميع دول الخليج العربي وإضافة علامات تجارية عالمية',
    },
    {
      id: 5,
      year: '2023',
      title: 'الريادة',
      description: 'الوصول لأكثر من 500 ألف عميل والحصول على جائزة أفضل متجر إلكتروني',
    },
    {
      id: 6,
      year: '2025',
      title: 'المستقبل',
      description: 'خطط طموحة للتوسع في الشرق الأوسط وإطلاق علامتنا التجارية الخاصة',
    },
  ]);

  timelineSectionTitle = signal('مسيرتنا عبر الزمن');
  timelineSectionDescription = signal('محطات مهمة في رحلة نجاحنا');
  timelineLayout = signal<'vertical' | 'horizontal'>('vertical');

  // Icon Options for selection
  iconOptions = [
    'bi-gem',
    'bi-shield-check',
    'bi-lightbulb',
    'bi-people',
    'bi-globe',
    'bi-hand-thumbs-up',
    'bi-heart',
    'bi-star',
    'bi-award',
    'bi-rocket-takeoff',
    'bi-eye',
    'bi-trophy',
    'bi-bag',
    'bi-truck',
    'bi-clock',
    'bi-chat-heart',
  ];

  setActiveSection(section: AboutSection): void {
    this.activeSection.set(section);
  }

  // About Header Methods
  updateAboutHeader<K extends keyof AboutHeader>(key: K, value: AboutHeader[K]): void {
    this.aboutHeader.update((h) => ({ ...h, [key]: value }));
  }

  onHeaderImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateAboutHeader('backgroundImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Our Story Methods
  updateOurStory<K extends keyof OurStory>(key: K, value: OurStory[K]): void {
    this.ourStory.update((s) => ({ ...s, [key]: value }));
  }

  onStoryImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateOurStory('image', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Mission & Vision Methods
  updateMissionVision<K extends keyof MissionVision>(key: K, value: MissionVision[K]): void {
    this.missionVision.update((mv) => ({ ...mv, [key]: value }));
  }

  // Values Methods
  updateValue(id: number, key: keyof ValueItem, value: any): void {
    this.ourValues.update((values) =>
      values.map((v) => (v.id === id ? { ...v, [key]: value } : v)),
    );
  }

  addValue(): void {
    const newId = Math.max(...this.ourValues().map((v) => v.id), 0) + 1;
    this.ourValues.update((values) => [
      ...values,
      { id: newId, icon: 'bi-star', title: '', description: '' },
    ]);
  }

  deleteValue(id: number): void {
    this.ourValues.update((values) => values.filter((v) => v.id !== id));
  }

  // Team Methods
  updateTeamMember(id: number, key: keyof TeamMember, value: any): void {
    this.teamMembers.update((members) =>
      members.map((m) => (m.id === id ? { ...m, [key]: value } : m)),
    );
  }

  addTeamMember(): void {
    const newId = Math.max(...this.teamMembers().map((m) => m.id), 0) + 1;
    this.teamMembers.update((members) => [
      ...members,
      {
        id: newId,
        name: '',
        position: '',
        image: 'https://via.placeholder.com/200x200/6c757d/ffffff?text=New',
        bio: '',
        socialLinks: [],
      },
    ]);
  }

  deleteTeamMember(id: number): void {
    this.teamMembers.update((members) => members.filter((m) => m.id !== id));
  }

  onTeamMemberImageUpload(event: Event, memberId: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateTeamMember(memberId, 'image', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Stats Methods
  updateStat(id: number, key: keyof StatItem, value: any): void {
    this.stats.update((stats) => stats.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  }

  addStat(): void {
    const newId = Math.max(...this.stats().map((s) => s.id), 0) + 1;
    this.stats.update((stats) => [
      ...stats,
      { id: newId, icon: 'bi-star', value: '0', label: '', suffix: '' },
    ]);
  }

  deleteStat(id: number): void {
    this.stats.update((stats) => stats.filter((s) => s.id !== id));
  }

  // Timeline Methods
  updateTimelineItem(id: number, key: keyof TimelineItem, value: any): void {
    this.timeline.update((items) =>
      items.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    );
  }

  addTimelineItem(): void {
    const newId = Math.max(...this.timeline().map((t) => t.id), 0) + 1;
    this.timeline.update((items) => [
      ...items,
      { id: newId, year: '', title: '', description: '' },
    ]);
  }

  deleteTimelineItem(id: number): void {
    this.timeline.update((items) => items.filter((item) => item.id !== id));
  }

  moveTimelineItem(id: number, direction: 'up' | 'down'): void {
    const items = [...this.timeline()];
    const index = items.findIndex((item) => item.id === id);

    if (direction === 'up' && index > 0) {
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
    } else if (direction === 'down' && index < items.length - 1) {
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
    }

    this.timeline.set(items);
  }
}
