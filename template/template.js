const app = getApp();

<%_ if (isComponent) { _%>
Component({
  properties: {},
  data: {},
  methods: {}
<%_ } else { _%>
Page({
  data: {},
  onLoad(options) {},
  onShow() {},
  onHide() {}
<%_ } _%>
})