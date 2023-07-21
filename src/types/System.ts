interface Disk {
    diskFree: number;
    diskPercent: number;
    diskTotal: number;
    diskUsed: number;
}

interface Memory {
    memoryAvailable: number;
    memoryPercent: number;
    memoryTotal: number;
    memoryUsed: number;
}

export interface SystemParame {
    boot_time: string;
    cpu: number;
    disk: Disk;
    memory: Memory;
    name: string;
    run: number;
}