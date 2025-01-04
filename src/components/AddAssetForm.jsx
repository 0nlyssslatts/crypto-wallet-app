import { useRef, useState } from "react";
import {
    Select,
    Space,
    Divider,
    Form,
    InputNumber,
    Button,
    Result,
} from "antd";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

const validateMessages = {
    required: "${label} is required!",
    types: {
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};

export default function AddAssetForm({ onClose }) {
    const [form] = Form.useForm();
    const { crypto, addAsset } = useCrypto();
    const [coin, setCoin] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef();

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
        };

        assetRef.current = newAsset;

        addAsset(newAsset);
        setSubmitted(true);
    }
    function handleAmountChange(value) {
        const price = form.getFieldValue("price");
        const newTotal = +(value * price).toFixed(2);
        form.setFieldValue("total", newTotal);
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue("amount");
        const newPrice = +(amount * value).toFixed(2);
        form.setFieldValue("total", newPrice);
    }

    if (!coin) {
        return (
            <Select
                style={{
                    width: "100%",
                }}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                placeholder="Select coin"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{ width: 20 }}
                            src={option.data.icon}
                            alt="icon"
                        />
                        {option.data.label}
                    </Space>
                )}
            />
        );
    }

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
        );
    }

    return (
        <Form
            form={form}
            name="basic"
            validateMessages={validateMessages}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: coin.price.toFixed(2),
            }}
            onFinish={onFinish}
        >
            <CoinInfo coin={coin} />

            <Divider />

            <Form.Item
                label="Amount"
                name="amount"
                style={{ width: "100%" }}
                rules={[
                    {
                        required: true,
                        type: "number",
                        min: 0,
                    },
                ]}
            >
                <InputNumber
                    onChange={handleAmountChange}
                    placeholder="Enter coin amount"
                    style={{ width: "100%" }}
                />
            </Form.Item>

            <Form.Item label="Price" name="price">
                <InputNumber
                    onChange={handlePriceChange}
                    style={{ width: "100%" }}
                />
            </Form.Item>

            <Form.Item label="Total" name="total">
                <InputNumber disabled style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    );
}
