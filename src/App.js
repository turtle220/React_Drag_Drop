import "./styles.css";
import { Table, Modal } from "antd";
import "antd/dist/antd.css";
import Sortable from "sortablejs";
import { ReactSortable } from "react-sortablejs";
import React from "react";
const confirm = Modal.confirm;
class App extends React.Component {
  columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address"
    }
  ];

  state = {
    dataSource: [
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号"
      },
      {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号"
      }
    ]
  };
  myEleRef = React.createRef();
  tableRef = (ref) => {
    console.log(ref);
  };
  componentDidMount() {
    const el = document.querySelector(".ant-table-tbody");
    new Sortable(el, {
      sort: false,
      draggable: ".ant-table-row",
      handle: ".ant-table-row",
      ghostClass: "sortable-ghost", // 排序镜像class,就是当鼠标拉起拖拽节点的时候添加该class
      chosenClass: "sortable-chosen", // //为拖拽的节点添加一个class 开始拖拽鼠标按下去的时候 添加该class
      setData: function (dataTransfer) {
        dataTransfer.setData("Text", "");
      },
      group: {
        name: "shared",
        pull: true,
        put: false // 不允许拖拽进这个列表
      },
      animation: 150,

      onMove: () => {},
      onEnd: (ev) => {
        console.log(ev);
        confirm({
          title: `确定要aa吗？`,
          content: "",
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            console.log("ok");
          },
          onCancel: () => {
            console.log("cancel");
          }
        });
      },
      onUpdate: (ev) => {
        console.log(ev);
      }
    });
    new Sortable(this.myEleRef.current, {
      group: {
        name: "shared",
        put: (a) => {
          console.log(a);

          confirm({
            title: "确定吗",
            onOk: () => {
              // a.nativeDraggable = true;
              return true;
            },
            onCancel: () => {
              return false;
              // a.nativeDraggable = false;
            }
          });
          console.log(this);
          return true;
          // return a.nativeDraggable;
        }
      },
      onUpdate: (ev) => {},
      onRemove: (ev) => {
        console.log("ev", ev);
        console.log("开始拖动");
        return false;
        console.log(ev);
      }
    });
    Sortable.create(el, {
      sort: true,
      scroll: true,
      delay: 10,
      animation: 150,
      draggable: ".ant-table-row",
      handle: ".ant-table-row",
      dataIdAttr: "class",
      ghostClass: "sortable-ghost", // 排序镜像class,就是当鼠标拉起拖拽节点的时候添加该class
      chosenClass: "sortable-chosen", // //为拖拽的节点添加一个class 开始拖拽鼠标按下去的时候 添加该class
      setData: function (dataTransfer) {
        dataTransfer.setData("Text", "");
      },
      // 拖拽结束执行,evt执向拖拽的参数
      onEnd: (evt) => {
        console.log(evt);
      }
    });
    console.log(Sortable);
  }
  antdconfirm = () => {
    return new Promise((resolve, reject) => {
      confirm({
        title: `确定要aa吗？`,

        content: "",

        okText: "确定",

        cancelText: "取消",

        onOk: () => {
          resolve("ok");
        },
        onCancel: () => {
          resolve("cancel");
        }
      });
    });
  };
  handleClick = async () => {
    await this.antdconfirm();
    return false;
  };
  render() {
    return (
      <div className="App">
        <Table
          dataSource={this.state.dataSource}
          columns={this.columns}
        ></Table>
        <div
          className="ele"
          ref={this.myEleRef}
          onClick={this.handleClick}
        ></div>
      </div>
    );
  }
}

export default App;
