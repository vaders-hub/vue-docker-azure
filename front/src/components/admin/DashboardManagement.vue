<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import SelectBox from '@/components/common/SelectBox.vue'

export default defineComponent({
  name: 'DashboardManagement',
  components: { SelectBox },
  setup() {
    const searchOptionList = ref(['지표 제목', '등록일'])
    const selectedSearch = ref('지표 제목')
    const selectChanged = (e) => {
      // console.log('selectChanged', e)
    }
    return { searchOptionList, selectedSearch, selectChanged }
  },
})
</script>

<template>
  <div class="admin-search">
    <div class="admin-search__inner">
      <div class="select-wrap search-select">
        <div class="option-item__data">
          <SelectBox
            :selectData="searchOptionList"
            v-model="selectedSearch"
            @selectChanged="selectChanged"
          />
        </div>
      </div>
      <div class="search-input">
        <input type="text" placeholder="검색어를 입력하세요." style="width: 200px" />
      </div>
      <button class="search-btn">검색</button>
    </div>
  </div>

  <div class="admin-table">
    <table>
      <caption>
        지표 리스트
      </caption>
      <colgroup>
        <col style="width: 7%" />
        <col style="width: 12%" />
        <col style="width: 15%" />
        <col />
        <col style="width: 12%" />
        <col style="width: 8%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">
            <input type="checkbox" id="indicatorAllCheck" title="지표 전체 선택" />
          </th>
          <th scope="col">영역</th>
          <th scope="col">회사</th>
          <th scope="col">지표 제목</th>
          <th scope="col">등록일</th>
          <th scope="col">노출여부</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="checkbox" id="indicatorCheck01" title="{지표제목 Text}" /></td>
          <td>Dashboard</td>
          <td>SK이노베이션</td>
          <td class="t-left">총배출량</td>
          <td>YYYY-MM-DD</td>
          <td>노출</td>
        </tr>
        <tr>
          <td><input type="checkbox" id="indicatorCheck02" title="{지표제목 Text}" /></td>
          <td>Dashboard</td>
          <td>SK아이테크놀로지</td>
          <td class="t-left">총배출량</td>
          <td>YYYY-MM-DD</td>
          <td>노출</td>
        </tr>
        <tr>
          <td><input type="checkbox" id="indicatorCheck03" title="{지표제목 Text}" /></td>
          <td>Dashboard</td>
          <td>SKI</td>
          <td class="t-left">총배출량</td>
          <td>YYYY-MM-DD</td>
          <td>노출</td>
        </tr>
        <tr>
          <td><input type="checkbox" id="indicatorCheck04" title="{지표제목 Text}" /></td>
          <td>Dashboard</td>
          <td>SKI</td>
          <td class="t-left">총배출량</td>
          <td>YYYY-MM-DD</td>
          <td>노출</td>
        </tr>
        <tr>
          <td><input type="checkbox" id="indicatorCheck05" title="{지표제목 Text}" /></td>
          <td>Dashboard</td>
          <td>SKI</td>
          <td class="t-left">총배출량</td>
          <td>YYYY-MM-DD</td>
          <td>노출</td>
        </tr>
        <tr>
          <td><input type="checkbox" id="indicatorCheck06" title="{지표제목 Text}" /></td>
          <td>Dashboard</td>
          <td>SKI</td>
          <td class="t-left">총배출량</td>
          <td>YYYY-MM-DD</td>
          <td>노출</td>
        </tr>
        <tr>
          <td><input type="checkbox" id="indicatorCheck07" title="{지표제목 Text}" /></td>
          <td>Dashboard</td>
          <td>SKI</td>
          <td class="t-left">총배출량</td>
          <td>YYYY-MM-DD</td>
          <td>노출</td>
        </tr>
        <tr>
          <td><input type="checkbox" id="indicatorCheck08" title="{지표제목 Text}" /></td>
          <td>Dashboard</td>
          <td>SKI</td>
          <td class="t-left">총배출량</td>
          <td>YYYY-MM-DD</td>
          <td>노출</td>
        </tr>
        <tr>
          <td><input type="checkbox" id="indicatorCheck09" title="{지표제목 Text}" /></td>
          <td>Dashboard</td>
          <td>SKI</td>
          <td class="t-left">총배출량</td>
          <td>YYYY-MM-DD</td>
          <td>노출</td>
        </tr>
        <tr>
          <td><input type="checkbox" id="indicatorCheck10" title="{지표제목 Text}" /></td>
          <td>Dashboard</td>
          <td>SKI</td>
          <td class="t-left">총배출량</td>
          <td>YYYY-MM-DD</td>
          <td>노출</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="admin-pagination">
    <button class="first"><span class="hidden">처음 페이지</span></button>
    <button class="prev"><span class="hidden">이전 페이지</span></button>
    <button class="on">1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>
    <button>8</button>
    <button>9</button>
    <button>10</button>
    <button class="next"><span class="hidden">다음 페이지</span></button>
    <button class="last"><span class="hidden">마지막 페이지</span></button>
  </div>
  <div class="admin-btn">
    <button class="btn-delete">선택 삭제</button>
    <button class="btn-confirm">등록</button>
  </div>
</template>
<style lang="scss" scoped>
.admin-search {
  margin-top: 35px;
}
.admin-table {
  margin-top: 100px;
}
</style>
