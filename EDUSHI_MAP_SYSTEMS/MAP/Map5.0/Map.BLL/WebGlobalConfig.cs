�}A� r A  UP�mՓ���a	��0��^���ꬩ>t8��;�#�U:c�7^�+z%^a-�V���y�kSL�n%>d@��ƚ��쵷�.��b��[�:đ����vͷ@S������������E<x�$E�x��)�Q��/Y
L�R��������jq�5xh���{nq.9|;K\x5p�)�718�i��IStuC/"�������6�"t��9�8�%�-�$T>��[WS�Ij�.\˖(d�C�����ka��ٗz��A�0zå�15�j�E��/��Ay��?���i�v���&�"�]�����>� 1� x25w5b� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�        }
        }

        /// <summary>
        /// 获取数据中心URL
        /// </summary>
        public static string DataCenterURL
        {
            get
            {
                return new System.Configuration.AppSettingsReader().GetValue("DataCenterURL", typeof(String)).ToString();
            }
        }
    }
}
