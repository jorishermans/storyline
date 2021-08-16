<script lang="ts">
export default {
  functional: true,
  props: {
    value: { type: [String, Number], required: true }
  },
  render(h: unknown, { data, props, scopedSlots }: unknown): unknown {
    const { value } = props
    const slotFn =
      value in scopedSlots ? scopedSlots[value] : scopedSlots.default

    return slotFn ? slotFn(data.attrs) : null
  }
}
</script>
