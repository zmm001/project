�}�� r b  �Q�����a	����px�<�t����\��L̷s�4(4\��O>1���ۄgM���f�+"{���7�M�,�_7�y=��@�ˋ!��6%��1s����{}���j�H`y�~�^~�vw54�]��K�\���kѱw-r��s��/@\�g7d�z��	�Mh�AG!��`�P?��|�#�kN/)I!�:���^A��.m�vC���\б�Ф������μAE)h{���}���Q�j��23Sc�捞�+
I���2_q �PS޾�v� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�&5��`\B���"��T��������zehBp߄���f��A�m�5�V�D�������d��6��,�K�u���b;I,������i��[' ��v$���>���;.I��(�<8?�z&�H7�,������<��p��ߚ(�X��*Wz��C�^�[�k����c��X��$����Mc:��Q������
`�S��7���b�	"�yC@�^���P��N�n����8�M���Gr~�6y1���r(�L3V�����.v���IIZL�������w�E�z��]9]۴k^�ȤE�����ԑ�m���b���,�o�U���n>��TdƑNGl���j�-e-M��8�+&w�	�~�j��n����\�|iCJ(<$R��ԯ��f�������ߟ��2� Q�����19;�FF�f+�6���3�G�xJ����e�K�ŌH��<����;�[��TE���5~�Z?w��^����%���,w�|.
з��l�ildHandler(IIndexable strategy);

    /// <summary>
    /// 生成索引的时间参数
    /// </summary>
    /// <typeparam name="T">参数附带的数据类型</typeparam>
    public class SearchEngineEventArgs<T> : EventArgs
    {
        /// <summary>
        /// 参数附带的数据
        /// </summary>
        public T Value { get; set; }

        /// <summary>
        /// 消息
        /// </summary>
        public string Message { get; set; }

    }
}
