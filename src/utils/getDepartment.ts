const getDepartment = (dep: number) => {
  switch (dep) {
    case 1:
      return "地球科学学院";
      break;
    case 2:
      return "能源学院";
      break;
    case 3:
      return "环境与土木工程学院";
      break;
    case 4:
      return "地球物理学院";
      break;
    case 5:
      return "核技术与自动化工程学院";
      break;
    case 6:
      return "材料与化学化工学院";
      break;
    case 7:
      return "管理科学学院";
      break;
    case 8:
      return "马克思主义学院";
      break;
    case 9:
      return "外国语学院";
      break;
    case 10:
      return "文法学院";
      break;
    case 11:
      return "商学院";
      break;
    case 12:
      return "传播科学与艺术学院";
      break;
    case 13:
      return "体育学院";
      break;
    case 14:
      return "计算机与网络安全学院(牛津布鲁克斯学院)";
      break;
    case 15:
      return "旅游与城乡规划学院";
      break;
    case 16:
      return "生态环境学院";
      break;
    case 17:
      return "数理学院";
      break;
    case 18:
      return "机电工程学院";
      break;
    case 19:
      return "研究生院";
      break;
    default:
      return "未找到该学院";
      break;
  }
};

export default getDepartment;

/* <Option value={0}>宜宾校区</Option>
              <Option value={1}>地球科学学院</Option>
              <Option value={2}>能源学院</Option>
              <Option value={3}>环境与土木工程学院</Option>
              <Option value={4}>地球物理学院</Option>
              <Option value={5}>核技术与自动化工程学院</Option>
              <Option value={6}>材料与化学化工学院</Option>
              <Option value={7}>管理科学学院</Option>
              <Option value={8}>马克思主义学院</Option>
              <Option value={9}>外国语学院</Option>
              <Option value={10}>文法学院</Option>
              <Option value={11}>商学院</Option>
              <Option value={12}>传播科学与艺术学院</Option>
              <Option value={13}>体育学院</Option>
              <Option value={14}>计算机与网络安全学院(牛津布鲁克斯学院)</Option>
              <Option value={15}>旅游与城乡规划学院</Option>
              <Option value={16}>生态环境学院</Option>
              <Option value={17}>数理学院</Option>
              <Option value={18}>机电工程学院</Option>
              <Option value={19}>研究生院</Option> */
