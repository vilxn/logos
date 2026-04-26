"use client"

import { useState } from "react"
import { Plus, Trash2, Save } from "lucide-react"
import {useNavigate} from "react-router-dom";
import s from "./Dashboard.module.css";
type Child = {
    id: string
    name: string
    age: number
    disability: string
}

export default function Dashboad() {
    const navigate = useNavigate();
    const [parent, setParent] = useState({
        firstName: "",
        lastName: "",
        relation: "",
    })

    const [childrenList, setChildrenList] = useState<Child[]>([
        {
            id: crypto.randomUUID(),
            name: "",
            age: 0,
            disability: "",
        },
    ])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const updateChild = (
        id: string,
        field: keyof Child,
        value: string
    ) => {
        setChildrenList((prev) =>
            prev.map((child) =>
                child.id === id
                    ? {
                        ...child,
                        [field]:
                            field === "age"
                                ? Number(value)
                                : value,
                    }
                    : child
            )
        )
    }

    const addChild = () => {
        setChildrenList((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                name: "",
                age: 0,
                disability: "",
            },
        ])
    }

    const removeChild = (id: string) => {
        if (childrenList.length === 1) return
        setChildrenList((prev) =>
            prev.filter((child) => child.id !== id)
        )
    }


    const validate = () => {
        if (!parent.firstName.trim()) {
            return "Введите имя"
        }

        if (!parent.lastName.trim()) {
            return "Введите фамилию"
        }

        if (!parent.relation) {
            return "Выберите роль"
        }

        for (const child of childrenList) {
            if (!child.name.trim()) {
                return "Введите имя ребёнка"
            }

            if (child.age <= 0 || child.age > 120) {
                return "Некорректный возраст"
            }
            if(child.disability.length == 0){
                return "Дополните информацию о ребенке"
            }
        }

        return null
    }

    const handleSubmit = async () => {
        const validationError = validate()

        if (validationError) {
            setError(validationError)
            return
        }

        setError(null)
        setLoading(true)
        navigate("/parent");

        /*try {
            const payload = {
                parent: {
                    ...parent,
                    firstName: parent.firstName.trim(),
                    lastName: parent.lastName.trim(),
                },
                children: childrenList.map((c) => ({
                    ...c,
                    name: c.name.trim(),
                })),
            }

            const res = await fetch("/api/parents/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                throw new Error("Server error")
            }

            setError("Сохранено успешно")
        } catch {
            setError("Ошибка сервера")
        } finally {
            setLoading(false)
        }*/
    }

    return (
        <div className={s.container}>
            <div className={s.card}>
                <h1 className={s.title}>Панель родителя</h1>
                <p className={s.subtitle}>Заполните данные профиля</p>

                {error && <div className={s.errorBox}>{error}</div>}


                <div className={s.parentGrid}>
                    <input
                        placeholder="Имя"
                        className={s.inputField}
                        value={parent.firstName}
                        onChange={(e) => setParent({ ...parent, firstName: e.target.value })}
                    />
                    <input
                        placeholder="Фамилия"
                        className={s.inputField}
                        value={parent.lastName}
                        onChange={(e) => setParent({ ...parent, lastName: e.target.value })}
                    />
                    <select
                        className={`${s.selectField} ${s.fullWidth}`}
                        value={parent.relation}
                        onChange={(e) => setParent({ ...parent, relation: e.target.value })}
                    >
                        <option value="">Кто вы для ребёнка?</option>
                        <option value="mother">Мама</option>
                        <option value="father">Папа</option>
                        <option value="guardian">Опекун</option>
                    </select>
                </div>


                <div className={s.childrenWrapper}>
                    <div className={s.sectionHeader}>
                        <h2 className={s.sectionTitle}>Дети</h2>
                        <button onClick={addChild} className={s.addButton}>
                            <Plus size={18} /> Добавить
                        </button>
                    </div>

                    {childrenList.map((child, index) => (
                        <div key={child.id} className={s.childCard}>
                            <div className={s.childCardHeader}>
                                <h3 className={s.childLabel}>Ребёнок {index + 1}</h3>
                                {childrenList.length > 1 && (
                                    <button
                                        onClick={() => removeChild(child.id)}
                                        className={s.removeButton}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>

                            <div className={s.childGrid}>
                                <input
                                    placeholder="Имя"
                                    className={s.inputField}
                                    value={child.name}
                                    onChange={(e) => updateChild(child.id, "name", e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Возраст"
                                    className={s.inputField}
                                    value={child.age || ""}
                                    onChange={(e) => updateChild(child.id, "age", e.target.value)}
                                />
                                <select
                                    className={s.selectField}
                                    value={child.disability}
                                    onChange={(e) => updateChild(child.id, "disability", e.target.value)}
                                >
                                    <option value="">Особенности</option>
                                    <option value="autism">Аутизм</option>
                                    <option value="adhd">СДВГ</option>
                                    <option value="speech_delay">Задержка речи</option>
                                    <option value="physical">Физические</option>
                                    <option value="unknown">Не знаю</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={s.saveButton}
                >
                    <Save size={18} />
                    {loading ? "Обработка данных..." : "Дальше"}
                </button>
            </div>
        </div>
    )
}