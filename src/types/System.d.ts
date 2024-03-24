// 磁盘
interface Disk {
    diskFree: number;
    diskPercent: number;
    diskTotal: number;
    diskUsed: number;
}

// 内存
interface Memory {
    memoryAvailable: number;
    memoryPercent: number;
    memoryTotal: number;
    memoryUsed: number;
}

// 系统信息
interface System {
    boot_time: string;
    cpu: number;
    disk: Disk;
    memory: Memory;
    name: string;
    run: number;
    ip: number
}

// 网站信息
interface Web {
    description: string
    keyword: string
    logo: string
    subhead: string
    title: string
}

type ArticleLayout = "classics" | "card" | "waterfall"
type RightSidebar = "author" | "hotArticle" | "randomArticle" | "newComments"

// 布局配置
interface Layout {
    isTheme: boolean,
    isArticleLayout: ArticleLayout,
    rightSidebar: RightSidebar,
    swiperImage: string,
    swiperText: string
}