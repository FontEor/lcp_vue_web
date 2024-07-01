// 埋点
import pageClick from "@/utils/pageClick";

export default {
    methods: {
        // 点击事件埋点
        clstag(intranetId, extranetId) {
            return pageClick(intranetId, extranetId);
        },
    },
}

/**
 * import pointMixins from "@/mixins/point";
 * mixins: [pointMixins],
 * :clstag="clstag('', '')"
 */
