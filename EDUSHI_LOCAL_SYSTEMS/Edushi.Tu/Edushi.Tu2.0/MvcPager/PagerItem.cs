�}5� r �!  9�Vw8i(���a	��X��_����챙�|OE���P9�i�˰��9q�A5��t� �' iʓ��15/���R�q���Ԃ�Ǭ��Ϊ��(���t��Tl�wв�c�������w�A��D'L���*�n>?
]}�����qHA�@����8#�;�'�j�x�p���?������o� ��\b��fZ�����D�Ec{C�p�<*��J�Ճ����*-�\Wv����x�����,�Pa)ߠ-�Х�e]��FU�?�"�|�1��؄8��|�C����-r;W��#�����W%����Yݦ������76����o�\+S)y�E��PA�s�-�P�K�-�ฯG3���eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�g Text { get; set; }
        internal int PageIndex { get; set; }
        internal bool Disabled { get; set; }
        internal PagerItemType Type { get; set; }
    }

    internal enum PagerItemType:byte
    {
        FirstPage,
        NextPage,
        AllText,
        PercentText,
        PrevPage,
        LastPage,
        MorePage,
        NumericPage
    }
}
