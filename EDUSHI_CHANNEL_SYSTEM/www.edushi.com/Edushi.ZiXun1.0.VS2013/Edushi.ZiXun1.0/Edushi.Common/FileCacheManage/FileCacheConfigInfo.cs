�}�� r k
  3>����w��a	��.��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'���)�/�o��IZ]��BV���`?��f��gmua���B틑��ƅm��6�y-����o�qsܾ�w���sF��� �ޗ�6�ކ�2�oF-��QB����1X�pS$O���0"Nk�0�L��Ygy�Pd�t)�x�%����t�~]ʉ��;F]h������`���t��^�J��B�	^&�x|sG��4��M����l�-�w�VZ\�=�%ۿH�{�Wɧ?$�l}?.<��Dep� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�
        public string Path { get; set; }
        /// <summary>
        /// 是否启用缓存
        /// </summary>
        public bool IsEnabled { get; set; }

        #region ICloneable 成员
        public object Clone()
        {
            return MemberwiseClone();
            //throw new NotImplementedException();
        }
        #endregion
    }
}
