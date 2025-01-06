import { STATUS_VALUE } from "../../constants/constant";
import { Todo } from "../../interfaces";

export const INITIAL_TODOS: Todo[] = [
  {
    id: 1,
    title: "Ăn sáng",
    description: "Bánh canh chả cá",
    dueDate: new Date("2024-12-17T02:30:03.805Z"),
    status: STATUS_VALUE.NOT_STARTED,
    isImportant: true,
    isUrgent: false,
  },
  {
    id: 2,
    title: "Họp nhóm",
    description: "Thảo luận tiến độ dự án",
    dueDate: new Date("2024-12-18T09:00:00.000Z"),
    status: STATUS_VALUE.IN_PROGRESS,
    isImportant: true,
    isUrgent: true,
  },
  {
    id: 3,
    title: "Tập thể dục",
    description: "Chạy bộ 5km",
    dueDate: new Date("2024-12-17T10:00:00.000Z"),
    status: STATUS_VALUE.DONE,
    isImportant: false,
    isUrgent: false,
  },
  {
    id: 4,
    title: "Mua sắm",
    description: "Mua nguyên liệu nấu ăn",
    dueDate: new Date("2024-12-19T14:30:00.000Z"),
    status: STATUS_VALUE.NOT_STARTED,
    isImportant: false,
    isUrgent: true,
  },
  {
    id: 5,
    title: "Học React",
    description: "Hoàn thành bài tập Redux Toolkit",
    dueDate: new Date("2024-12-20T16:00:00.000Z"),
    status: STATUS_VALUE.IN_PROGRESS,
    isImportant: true,
    isUrgent: false,
  },
  {
    id: 6,
    title: "Đọc sách",
    description: "Hoàn thành chương 5 của sách Atomic Habits",
    dueDate: new Date("2024-12-18T20:00:00.000Z"),
    status: STATUS_VALUE.NOT_STARTED,
    isImportant: false,
    isUrgent: false,
  },
  {
    id: 7,
    title: "Đi siêu thị",
    description: "Mua sữa và bánh mì",
    dueDate: new Date("2024-12-17T18:30:00.000Z"),
    status: STATUS_VALUE.DONE,
    isImportant: true,
    isUrgent: true,
  },
  {
    id: 8,
    title: "Viết blog",
    description: "Bài viết về kỹ năng mềm trong công việc",
    dueDate: new Date("2024-12-21T12:00:00.000Z"),
    status: STATUS_VALUE.NOT_STARTED,
    isImportant: true,
    isUrgent: false,
  },
  {
    id: 9,
    title: "Học tiếng Anh",
    description: "Luyện nghe bài Ted Talk",
    dueDate: new Date("2024-12-22T08:00:00.000Z"),
    status: STATUS_VALUE.IN_PROGRESS,
    isImportant: true,
    isUrgent: true,
  },
  {
    id: 10,
    title: "Làm bài kiểm tra",
    description: "Kiểm tra cuối kỳ môn lập trình",
    dueDate: new Date("2024-12-23T10:00:00.000Z"),
    status: STATUS_VALUE.NOT_STARTED,
    isImportant: true,
    isUrgent: true,
  },
  {
    id: 11,
    title: "Dọn dẹp nhà cửa",
    description: "Quét dọn và lau sàn nhà",
    dueDate: new Date("2024-12-17T16:00:00.000Z"),
    status: STATUS_VALUE.DONE,
    isImportant: false,
    isUrgent: true,
  },
  {
    id: 12,
    title: "Lập kế hoạch tuần",
    description: "Viết ra các mục tiêu cần hoàn thành trong tuần",
    dueDate: new Date("2024-12-18T19:00:00.000Z"),
    status: STATUS_VALUE.NOT_STARTED,
    isImportant: true,
    isUrgent: false,
  },
  {
    id: 13,
    title: "Thăm ông bà",
    description: "Đến nhà thăm và trò chuyện với ông bà",
    dueDate: new Date("2024-12-24T14:00:00.000Z"),
    status: STATUS_VALUE.NOT_STARTED,
    isImportant: true,
    isUrgent: false,
  },
  {
    id: 14,
    title: "Chuẩn bị báo cáo",
    description: "Tóm tắt kết quả dự án tháng 12",
    dueDate: new Date("2024-12-20T09:00:00.000Z"),
    status: STATUS_VALUE.IN_PROGRESS,
    isImportant: true,
    isUrgent: true,
  },
  {
    id: 15,
    title: "Học kỹ năng Excel",
    description: "Tìm hiểu các hàm nâng cao",
    dueDate: new Date("2024-12-25T18:00:00.000Z"),
    status: STATUS_VALUE.NOT_STARTED,
    isImportant: false,
    isUrgent: false,
  },
  {
    id: 16,
    title: "Tham gia hội thảo",
    description: "Chủ đề về phát triển bản thân",
    dueDate: new Date("2024-12-19T10:00:00.000Z"),
    status: STATUS_VALUE.DONE,
    isImportant: true,
    isUrgent: true,
  },
  {
    id: 17,
    title: "Đi dã ngoại",
    description: "Chuyến đi công viên cùng bạn bè",
    dueDate: new Date("2024-12-26T09:30:00.000Z"),
    status: STATUS_VALUE.NOT_STARTED,
    isImportant: false,
    isUrgent: false,
  },
  {
    id: 18,
    title: "Học lập trình TypeScript",
    description: "Làm bài tập về interface và type",
    dueDate: new Date("2024-12-20T15:00:00.000Z"),
    status: STATUS_VALUE.IN_PROGRESS,
    isImportant: true,
    isUrgent: false,
  },
  {
    id: 19,
    title: "Tham gia họp phụ huynh",
    description: "Thảo luận kết quả học tập của con",
    dueDate: new Date("2024-12-18T07:00:00.000Z"),
    status: STATUS_VALUE.DONE,
    isImportant: true,
    isUrgent: true,
  },
  {
    id: 20,
    title: "Tự học nấu ăn",
    description: "Thử nấu món phở bò",
    dueDate: new Date("2024-12-19T17:00:00.000Z"),
    status: STATUS_VALUE.NOT_STARTED,
    isImportant: false,
    isUrgent: false,
  },
];
