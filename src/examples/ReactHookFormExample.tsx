import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해 주세요."),
});

type FormValues = z.infer<typeof formSchema>;

type CreateUserPayload = {
  displayName: string;
};

export default function ReactHookFormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (data.name === "duplicate") {
      setError(
        "name",
        {
          type: "server",
          message: "이미 사용 중인 이름입니다.",
        },
        {
          shouldFocus: true,
        },
      );
      return;
    }
    if (data.name === "server-error") {
      setError("root.server", {
        type: "server",
        message: "잠시 후 다시 시도해 주세요.",
      });
      return;
    }

    const payload: CreateUserPayload = {
      displayName: data.name,
    };
    console.log(payload);
  };

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">Phase 7-B. React Hook Form과 Zod</p>
        <h2>React Hook Form 기본 구조</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="hook-form-name">이름</label>
          <input
            id="hook-form-name"
            {...register("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "hook-form-name-error" : undefined}
          />
          {errors.name && (
            <p id="hook-form-name-error">{errors.name.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "제출 중..." : "제출"}
        </button>
        {errors.root?.server && (
          <p role="alert">{errors.root.server.message}</p>
        )}
      </form>
    </div>
  );
}
