<template>
  <div class="ranking">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="昨天">
        <ul class="list">
          <li>
            <span>1</span>
            <p class="line_text">
              写在B站于香港二次上市之际——致广大用户的公开信
            </p>
          </li>
          <li>
            <span>2</span>
            <p class="line_text">
              写在B站于香港二次上市之际——致广大用户的公开信
            </p>
          </li>
          <li>
            <span>3</span>
            <p class="line_text">
              写在B站于香港二次上市之际——致广大用户的公开信
            </p>
          </li>
          <li>
            <span>4</span>
            <p class="line_text">
              写在B站于香港二次上市之际——致广大用户的公开信
            </p>
          </li>
          <li>
            <span>5</span>
            <p class="line_text">
              写在B站于香港二次上市之际——致广大用户的公开信
            </p>
          </li>
          <li>
            <span>6</span>
            <p class="line_text">
              写在B站于香港二次上市之际——致广大用户的公开信
            </p>
          </li>
          <li>
            <span>7</span>
            <p class="line_text">
              写在B站于香港二次上市之际——致广大用户的公开信
            </p>
          </li>
          <li>
            <span>8</span>
            <p class="line_text">
              写在B站于香港二次上市之际——致广大用户的公开信
            </p>
          </li>
        </ul>
      </a-tab-pane>
      <a-tab-pane key="2" tab="本周"> Content of Tab Pane 2 </a-tab-pane>
      <a-tab-pane key="3" tab="本月"> Content of Tab Pane 3 </a-tab-pane>
      <p slot="tabBarExtraContent">排行榜</p>
    </a-tabs>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.ranking {
  width: 280px;
  /deep/.ant-tabs-extra-content {
    font-size: 18px;
    display: inline-block;
    color: #222;
    float: left !important;
    margin-right: 20px;
  }
  .ant-tabs-tab {
    font-size: 12px;
  }
  .list {
    padding: 0;
    li {
      list-style: none;
      display: flex;
      align-items: center;
      height: 39px;
      font-size: 12px;
      p {
        color: #222;
        margin: 0;
      }
      span {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        background-color: #f25d8e;
        text-align: center;
        line-height: 18px;
        color: white;
        margin-right: 8px;
      }
      &:nth-of-type(n+3){
        span{
          background-color: #ccd0d7;
        }
      }
    }
  }
}
</style>