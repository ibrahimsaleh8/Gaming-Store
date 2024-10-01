import { motion } from "framer-motion";
export default function TextAnimation({ text }: { text: string }) {
  const Description = text.split("").map((e, i) => (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i / 80 }}
      key={i}>
      {e}
    </motion.span>
  ));

  return <>{Description}</>;
}
