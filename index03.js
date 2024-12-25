// 初始化图表
document.addEventListener('DOMContentLoaded', function() {
    // 课表切换功能
    const semesterTabs = document.querySelectorAll('.semester-tab');
    const schedules = document.querySelectorAll('.course-schedule');

    semesterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const semester = tab.dataset.semester;
            
            // 更新标签状态
            semesterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 更新课表显示
            schedules.forEach(schedule => {
                if(schedule.dataset.semester === semester) {
                    schedule.classList.add('active');
                } else {
                    schedule.classList.remove('active');
                }
            });
        });
    });

    // 初始化手机使用时长图表
    const usageChart = echarts.init(document.getElementById('usageChart'));
    
    // 将时间转换为小时
    const timeToHours = (hours, minutes) => {
        return parseFloat((hours + minutes/60).toFixed(2));
    };

    // 手机使用数据（修正12-19的数据）
    const usageData = [
        { date: '12-19', time: timeToHours(15, 56) },  // 修正为15小时56分钟
        { date: '12-20', time: timeToHours(16, 26) },
        { date: '12-21', time: timeToHours(13, 49) },
        { date: '12-22', time: timeToHours(9, 59) },
        { date: '12-23', time: timeToHours(12, 39) },
        { date: '12-24', time: timeToHours(14, 27) }
    ];

    // 图表配置
    const usageOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                const hours = Math.floor(data.value);
                const minutes = Math.round((data.value - hours) * 60);
                return `${data.name}<br/>使用时长: ${hours}小时${minutes}分钟`;
            }
        },
        xAxis: {
            type: 'category',
            data: usageData.map(item => item.date),
            axisLabel: {
                color: '#666'
            }
        },
        yAxis: {
            type: 'value',
            name: '小时',
            axisLabel: {
                formatter: '{value}h',
                color: '#666'
            },
            splitLine: {
                lineStyle: {
                    color: '#eee'
                }
            }
        },
        series: [{
            data: usageData.map(item => item.time),
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                ])
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#2378f7' },
                        { offset: 0.7, color: '#2378f7' },
                        { offset: 1, color: '#83bff6' }
                    ])
                }
            },
            barWidth: '60%'
        }],
        grid: {
            left: '10%',
            right: '4%',
            bottom: '12%',
            top: '10%',
            containLabel: true
        }
    };

    // 设置图表配置
    usageChart.setOption(usageOption);

    // 响应式调整
    window.addEventListener('resize', function() {
        usageChart.resize();
    });

    // 初始化软件使用时间环形图
    const appChart = echarts.init(document.getElementById('appWordCloud'));
    
    // 软件使用数据
    const appData = [
        { name: '微信', value: 15 },
        { name: '哔哩哔哩', value: 9 },
        { name: '网易云', value: 5 },
        { name: '笔记', value: 2 },
        { name: '优酷', value: 2 }
    ];

    // 环形图配置
    const appChartOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}小时 ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: '10%',
            top: 'center',
            textStyle: {
                color: '#666'
            }
        },
        series: [{
            name: '使用时长',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '18',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: appData.map(item => ({
                name: item.name,
                value: item.value,
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: getRandomColor(0.8)
                        }, {
                            offset: 1,
                            color: getRandomColor(0.6)
                        }]
                    }
                }
            }))
        }]
    };

    // 生成随机渐变色
    function getRandomColor(opacity) {
        const colors = [
            `rgba(24, 144, 255, ${opacity})`,    // 蓝色
            `rgba(54, 203, 203, ${opacity})`,    // 青色
            `rgba(78, 203, 115, ${opacity})`,    // 绿色
            `rgba(251, 212, 55, ${opacity})`,    // 黄色
            `rgba(242, 99, 123, ${opacity})`     // 粉色
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 设置环形图配置
    appChart.setOption(appChartOption);

    // 响应式调整
    window.addEventListener('resize', function() {
        appChart.resize();
    });
}); 